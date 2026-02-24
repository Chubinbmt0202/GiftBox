import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';

const NOTIFICATIONS_COLLECTION = 'notifications';

export interface NotificationData {
    title: string;
    message: string;
    type: 'new_order' | 'order_cancelled' | 'system' | 'info';
    read: boolean;
    createdAt: any;
    link?: string; // Optional link to navigate when clicked
}

export const createNotification = async (data: Omit<NotificationData, 'createdAt' | 'read'>) => {
    try {
        await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
            ...data,
            read: false,
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

export const subscribeToNotifications = (callback: (notifications: (NotificationData & { id: string })[]) => void) => {
    const q = query(collection(db, NOTIFICATIONS_COLLECTION), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData, DocumentData>) => {
        const notifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as NotificationData & { id: string }));
        callback(notifications);
    }, (error: Error) => {
        console.error("Error subscribing to notifications:", error);
    });
};

export const markNotificationAsRead = async (id: string) => {
    try {
        const docRef = doc(db, NOTIFICATIONS_COLLECTION, id);
        await updateDoc(docRef, { read: true });
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
};

export const markAllNotificationsAsRead = async (notificationIds: string[]) => {
    try {
        const promises = notificationIds.map(id => updateDoc(doc(db, NOTIFICATIONS_COLLECTION, id), { read: true }));
        await Promise.all(promises);
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
    }
};
