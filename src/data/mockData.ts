import type { Category, GiftSet, Product } from '../types';

export const mockCategories: Category[] = [
    { id: 'c1', name: 'Nến thơm' },
    { id: 'c2', name: 'Bùi nhùi' },
    { id: 'c3', name: 'Ly/ cốc' },
    { id: 'c4', name: 'Sổ tay' },
    { id: 'c5', name: 'Vòng tay' },
    { id: 'c6', name: 'Thiệp' },
    { id: 'c7', name: 'Bút' },
    { id: 'c8', name: 'Hoa giấy' },
    { id: 'c9', name: 'Tất' },
    { id: 'c10', name: 'Cột tóc' },
    { id: 'c11', name: 'Túi thơm' },
    { id: 'c12', name: 'Bánh kẹo' },
    { id: 'c13', name: 'Gấu bông' },
    { id: 'c14', name: 'Sticker' },
    { id: 'c15', name: 'Ruy băng' },
];

export const mockSets: GiftSet[] = [
    {
        id: 's1',
        name: 'Set Quà Sinh Nhật',
        price: 250000,
        originalPrice: 300000,
        description: 'Bao gồm thiệp, nến thơm sinh nhật, bánh kẹo và gấu bông nhỏ, được bọc cẩn thận.',
        items: ['Thiệp chúc mừng', 'Nến thơm vị Vanilla', 'Kẹo dẻo', 'Gấu bông mini'],
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 120,
        badge: '16% off',
        theme: 'birthday'
    },
    {
        id: 's2',
        name: 'Quà Giáng Sinh & Năm Mới',
        price: 350000,
        originalPrice: 400000,
        description: 'Tone đỏ xanh ấm áp với tất, nến thơm quế, ly sứ và thiệp Giáng sinh.',
        items: ['Tất hoạ tiết Noel', 'Nến thơm Hương Quế', 'Ly sứ đỏ', 'Thiệp Giáng sinh'],
        image: 'https://images.unsplash.com/photo-1512389142860-9c44db72aeb4?q=80&w=600&auto=format&fit=crop',
        rating: 4.8,
        reviewsCount: 85,
        badge: '12% off',
        theme: 'christmas'
    },
    {
        id: 's3',
        name: 'Quà Tình Yêu & Kỷ Niệm',
        price: 450000,
        description: 'Set quà ngọt ngào với vòng tay đôi, sổ tay handmade, hoa giấy và túi thơm thảo mộc.',
        items: ['Vòng tay chỉ đỏ', 'Sổ tay bìa da', 'Hoa giấy nghệ thuật', 'Túi thơm Lavender'],
        image: 'https://images.unsplash.com/photo-1518199268815-95a206eb26fe?q=80&w=600&auto=format&fit=crop',
        rating: 5.0,
        reviewsCount: 200,
        badge: 'Hot',
        theme: 'anniversary'
    },
    {
        id: 's4',
        name: 'Set Quà Tết Đoàn Viên',
        price: 550000,
        originalPrice: 650000,
        description: 'Hộp quà cao cấp với các loại hạt, trà thơm, mứt Tết và phong bao lì xì may mắn.',
        items: ['Hộp trà Lài', 'Mứt Gừng', 'Hạt Macca', 'Bao lì xì thiết kế riêng'],
        image: 'https://images.unsplash.com/photo-1547053508-3162fb52cfbc?q=80&w=600&auto=format&fit=crop',
        rating: 4.9,
        reviewsCount: 150,
        badge: 'Bestseller',
        theme: 'tet'
    },
    {
        id: 's5',
        name: 'Set Quà Just For You',
        price: 200000,
        description: 'Món quà tự thưởng bản thân hoặc gửi tặng người thân yêu vào một ngày bình thường.',
        items: ['Ly sứ vintage', 'Sổ tay kraft', 'Bút gỗ khắc tên'],
        image: 'https://images.unsplash.com/photo-1584988296765-a8647240c5b5?q=80&w=600&auto=format&fit=crop',
        rating: 4.7,
        reviewsCount: 45,
        theme: 'general'
    }
];

export const mockProducts: Product[] = [
    { id: 'p1', name: 'Nến thơm Vanilla', price: 85000, originalPrice: 100000, categoryId: 'c1', image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=300&q=80', rating: 4.8, badge: '15% off' },
    { id: 'p2', name: 'Nến thơm Hoa Hồng', price: 95000, categoryId: 'c1', image: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=300&q=80', rating: 4.9 },
    { id: 'p3', name: 'Bùi nhùi trang trí', price: 15000, originalPrice: 20000, categoryId: 'c2', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=300&q=80', rating: 4.5, badge: '25% off' },
    { id: 'p4', name: 'Ly sứ vintage', price: 120000, originalPrice: 150000, categoryId: 'c3', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&q=80', rating: 5.0, badge: 'Sale' },
    { id: 'p5', name: 'Sổ tay kraft', price: 45000, categoryId: 'c4', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80', rating: 4.7 },
    { id: 'p6', name: 'Vòng tay handmade', price: 35000, originalPrice: 45000, categoryId: 'c5', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80', rating: 4.6, badge: '22% off' },
    { id: 'p7', name: 'Thiệp hoa khô', price: 25000, categoryId: 'c6', image: 'https://images.unsplash.com/photo-1606461973007-88eb7d6bd3ff?w=300&q=80', rating: 4.9 },
    { id: 'p8', name: 'Bút gỗ khắc tên', price: 55000, originalPrice: 65000, categoryId: 'c7', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=300&q=80', rating: 4.8, badge: '15% off' },
    { id: 'p9', name: 'Hoa giấy origami', price: 20000, categoryId: 'c8', image: 'https://images.unsplash.com/photo-1507646871146-24baadd54e19?w=300&q=80', rating: 4.4 },
    { id: 'p10', name: 'Tất hoạ tiết', price: 40000, originalPrice: 50000, categoryId: 'c9', image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=300&q=80', rating: 4.7, badge: '20% off' },
    { id: 'p11', name: 'Cột tóc scrunchie', price: 18000, categoryId: 'c10', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&q=80', rating: 4.8 },
    { id: 'p12', name: 'Túi thơm Lavender', price: 30000, originalPrice: 40000, categoryId: 'c11', image: 'https://plus.unsplash.com/premium_photo-1675800055811-3fb3db1f4684?w=300&q=80', rating: 5.0, badge: '25% off' },
    { id: 'p13', name: 'Kẹo dẻo trái cây', price: 25000, categoryId: 'c12', image: 'https://images.unsplash.com/photo-1582058091505-f878153e4142?w=300&q=80', rating: 4.6 },
    { id: 'p14', name: 'Gấu bông mini', price: 65000, originalPrice: 80000, categoryId: 'c13', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=300&q=80', rating: 4.9, badge: '18% off' },
    { id: 'p15', name: 'Sticker vintage', price: 10000, categoryId: 'c14', image: 'https://images.unsplash.com/photo-1614820202685-61eedcd2efcd?w=300&q=80', rating: 4.7 },
    { id: 'p16', name: 'Ruy băng lụa', price: 12000, originalPrice: 15000, categoryId: 'c15', image: 'https://images.unsplash.com/photo-1605648816405-1a804ed8be4c?w=300&q=80', rating: 4.8, badge: '20% off' },
];
