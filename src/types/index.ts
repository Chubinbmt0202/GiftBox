export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  image?: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string; // e.g. "50% off", "New"
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface GiftSet {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  items: string[]; // List of product IDs included or just descriptions
  image?: string;
  rating?: number;
  reviewsCount?: number;
  badge?: string;
}

export interface CartItem {
  id: string; // unique ID for cart entry (can be uuid or Product.id if we just group by quantity)
  productId?: string;
  setId?: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'set';
  image?: string;
}
