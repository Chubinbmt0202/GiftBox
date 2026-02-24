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
    where,
    getCountFromServer
} from 'firebase/firestore';

export interface Category {
    id?: string;
    name: string;
    slug: string;
    count: number | string;
    status: 'Active' | 'Inactive';
    iconName: string; // Store icon string name instead of component
    createdAt: number;
}

const CATEGORY_COLLECTION = 'categories';

export const getCategories = async (): Promise<Category[]> => {
    try {
        const q = query(collection(db, CATEGORY_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const categories: Category[] = [];
        querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() } as Category);
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories: ", error);
        throw error;
    }
};

export const addCategory = async (category: Omit<Category, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, CATEGORY_COLLECTION), {
            ...category,
            createdAt: Date.now()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding category: ", error);
        throw error;
    }
};

export const updateCategory = async (id: string, data: Partial<Category>): Promise<void> => {
    try {
        const categoryRef = doc(db, CATEGORY_COLLECTION, id);
        await updateDoc(categoryRef, data);
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error;
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
};

export const recalculateCategoryCount = async (categoryName: string): Promise<void> => {
    try {
        const catQuery = query(collection(db, CATEGORY_COLLECTION), where('name', '==', categoryName));
        const catSnap = await getDocs(catQuery);
        if (catSnap.empty) return;

        const prodQuery = query(collection(db, 'products'), where('category', '==', categoryName));
        const prodCountSnap = await getCountFromServer(prodQuery);
        const count = prodCountSnap.data().count;

        // We use Promise.all to ensure updates complete (usually just 1 category matches name)
        const updatePromises = catSnap.docs.map(document => {
            const catRef = doc(db, CATEGORY_COLLECTION, document.id);
            return updateDoc(catRef, { count });
        });
        await Promise.all(updatePromises);
    } catch (error) {
        console.error("Error recalculating category count: ", error);
    }
};
