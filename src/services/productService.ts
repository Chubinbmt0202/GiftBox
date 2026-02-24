import { db } from '../config/firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    getDoc
} from 'firebase/firestore';
import { recalculateCategoryCount } from './categoryService';

export interface Product {
    id?: string;
    name: string;
    sku: string;
    category: string;
    price: string | number;
    stock: number;
    status?: 'In Stock' | 'Low Stock' | 'Out of Stock'; // calculated
    imageUrl: string;
    createdAt?: number;
}

const PRODUCT_COLLECTION = 'products';

// Helper to determine status based on stock
export const calculateProductStatus = (stock: number): Product['status'] => {
    if (stock <= 0) return 'Out of Stock';
    if (stock <= 20) return 'Low Stock';
    return 'In Stock';
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const q = query(collection(db, PRODUCT_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as Product;
            products.push({
                ...data,
                id: doc.id,
                // Ensure status is always up to date with stock
                status: calculateProductStatus(data.stock)
            });
        });
        return products;
    } catch (error) {
        console.error("Error getting products: ", error);
        throw error;
    }
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, PRODUCT_COLLECTION), {
            ...product,
            status: calculateProductStatus(product.stock),
            createdAt: Date.now()
        });
        await recalculateCategoryCount(product.category);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<void> => {
    try {
        const productRef = doc(db, PRODUCT_COLLECTION, id);

        const oldProductSnap = await getDoc(productRef);
        const oldCategory = oldProductSnap.exists() ? oldProductSnap.data()?.category : null;

        const updateData = { ...data };
        if (updateData.stock !== undefined) {
            updateData.status = calculateProductStatus(updateData.stock);
        }

        await updateDoc(productRef, updateData);

        if (oldCategory && data.category && oldCategory !== data.category) {
            await recalculateCategoryCount(oldCategory);
            await recalculateCategoryCount(data.category);
        }
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const productRef = doc(db, PRODUCT_COLLECTION, id);
        const oldProductSnap = await getDoc(productRef);
        const oldCategory = oldProductSnap.exists() ? oldProductSnap.data()?.category : null;

        await deleteDoc(productRef);

        if (oldCategory) {
            await recalculateCategoryCount(oldCategory);
        }
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
};
