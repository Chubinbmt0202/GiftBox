export interface Box {
    id: string | number;
    name: string;
    desc?: string;
    price: number;
    capacity: number;
    image?: string;
    imageUrl?: string;
}

export interface Product {
    id: string | number;
    name: string;
    category: string;
    price: number;
    image?: string;
    imageUrl?: string;
    status?: string;
}

export interface Card {
    id: string | number;
    name: string;
    price: number;
    image: string;
}

export interface SelectedProduct extends Product {
    quantity: number;
}

export const MOCK_BOXES: Box[] = [
    { id: 1, name: "Classic Kraft Box", desc: "Sustainable & minimalist", price: 10, capacity: 6, image: "https://images.unsplash.com/photo-1572983792618-2adac7da9ec1?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Premium Black Box", desc: "Elegant & luxurious", price: 15, capacity: 8, image: "https://images.unsplash.com/photo-1607525389650-7117e3f53eff?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Large Wooden Box", desc: "Rustic & durable", price: 25, capacity: 12, image: "https://images.unsplash.com/photo-1454587399580-0a2db7936a23?q=80&w=400&auto=format&fit=crop" },
];

export const ITEM_CATEGORIES = [
    "Tất cả", "Nến thơm", "Ly / cốc", "Sổ tay", "Vòng tay", "Thiệp", "Bút",
    "Hoa giấy", "Tất", "Cột tóc", "Túi thơm", "Bánh kẹo", "Gấu bông", "Sticker", "Phụ kiện gói (Bùi nhùi, Ruy băng)"
];

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Sản phẩm mẫu ${i + 1}`,
    category: ITEM_CATEGORIES[(i % (ITEM_CATEGORIES.length - 1)) + 1],
    price: Math.floor(Math.random() * 20 + 5),
    image: `https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=400&auto=format&fit=crop`
}));

export const MOCK_CARDS: Card[] = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Thiệp chúc mừng ${i + 1}`,
    price: Math.floor(Math.random() * 5 + 2),
    image: `https://images.unsplash.com/photo-1554181829-06b2fb55f242?q=80&w=400&auto=format&fit=crop`
}));
