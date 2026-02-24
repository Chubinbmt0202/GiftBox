import { db } from '../config/firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';

export interface CheckoutCustomerInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    notes?: string;
}

export interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface OrderData {
    customerInfo: CheckoutCustomerInfo;
    paymentMethod: string;
    items: OrderItem[];
    cardMessage?: string;
    boxId: string | number;
    boxName: string;
    boxPrice: number;
    cardId: string | number;
    cardName: string;
    cardPrice: number;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: any;
}

const ORDERS_COLLECTION = 'orders';

export const createOrder = async (orderData: Omit<OrderData, 'createdAt' | 'status'>) => {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...orderData,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding order: ", error);
        throw error;
    }
};

export const getAllOrders = async (): Promise<(OrderData & { id: string })[]> => {
    try {
        const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as OrderData & { id: string }));
    } catch (error) {
        console.error("Error fetching orders: ", error);
        throw error;
    }
};

export const getOrderById = async (id: string): Promise<(OrderData & { id: string }) | null> => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as OrderData & { id: string };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};

export const updateOrderStatus = async (id: string, status: OrderData['status']): Promise<void> => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, id);
        await updateDoc(docRef, {
            status: status
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};
