import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../services/productService';
import { type Category, getCategories } from '../../services/categoryService';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Product, 'id' | 'createdAt' | 'status'>) => Promise<void>;
    productData?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    onSave,
    productData
}) => {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState<string | number>('');
    const [stock, setStock] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Load available categories for the dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
                if (data.length > 0 && !productData && !category) {
                    setCategory(data[0].name); // Set default category if none
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    useEffect(() => {
        if (productData) {
            setName(productData.name);
            setSku(productData.sku);
            setCategory(productData.category);
            setPrice(productData.price);
            setStock(productData.stock);
            setImageUrl(productData.imageUrl);
        } else {
            setName('');
            setSku('');
            setPrice('');
            setStock(0);
            setImageUrl('');
        }
    }, [productData, isOpen]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !sku.trim() || !category.trim()) return;

        setIsLoading(true);
        try {
            await onSave({
                name,
                sku,
                category,
                price,
                stock: Number(stock),
                imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1513885535851-8b9feda47eec?w=200&q=80', // Fallback image
            });
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 sticky top-0 z-10">
                    <h2 className="text-lg font-bold text-gray-900">
                        {productData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Default Image Fallback View */}
                    <div className="flex gap-6 items-start">
                        <div className="w-24 h-24 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL';
                                }} />
                            ) : (
                                <span className="text-xs text-gray-400 text-center font-medium px-2">Ảnh xem trước</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Đường dẫn ảnh (URL)</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                            />
                            <p className="text-xs text-gray-400 mt-1.5 font-medium">Vui lòng cung cấp một đường dẫn ảnh hợp lệ cho sản phẩm.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Tên sản phẩm *</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên sản phẩm..."
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Mã SKU *</label>
                            <input
                                type="text"
                                required
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                placeholder="vd: WH-P-02"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Danh mục *</label>
                            <select
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium appearance-none"
                            >
                                <option value="" disabled>Chọn danh mục</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Giá bán *</label>
                            <input
                                type="text"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="vd: 199.000"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Số lượng tồn kho *</label>
                            <input
                                type="number"
                                min="0"
                                required
                                value={stock}
                                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.05)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !name.trim() || !sku.trim()}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-xl transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                        >
                            {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            {productData ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
