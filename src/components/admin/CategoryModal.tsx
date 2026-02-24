import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Category } from '../../services/categoryService';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<Category, 'id' | 'createdAt'>) => Promise<void>;
    categoryData?: Category | null; // Pass null for create, category object for edit
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    onSave,
    categoryData
}) => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
    const [iconName, setIconName] = useState('Tags'); // Default icon
    const [isLoading, setIsLoading] = useState(false);

    // Available icons list for selection
    const availableIcons = ['Headphones', 'Shirt', 'Armchair', 'Activity', 'Book', 'Tags', 'Package', 'Gift', 'Star'];

    useEffect(() => {
        if (categoryData) {
            setName(categoryData.name);
            setSlug(categoryData.slug);
            setStatus(categoryData.status);
            setIconName(categoryData.iconName || 'Tags');
        } else {
            setName('');
            setSlug('');
            setStatus('Active');
            setIconName('Tags');
        }
    }, [categoryData, isOpen]);

    // Auto-generate slug from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (!categoryData) { // Only auto-gen if creating new
            setSlug('/' + newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !slug.trim()) return;

        setIsLoading(true);
        try {
            await onSave({
                name,
                slug,
                status,
                iconName,
                count: categoryData ? Number(categoryData.count) || 0 : 0,
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

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">
                        {categoryData ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Tên danh mục *</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={handleNameChange}
                            placeholder="vd: Hộp quà sinh nhật"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Slug *</label>
                        <input
                            type="text"
                            required
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="vd: /hop-qua-sinh-nhat"
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Trạng thái</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium appearance-none"
                            >
                                <option value="Active">Hoạt động</option>
                                <option value="Inactive">Ngừng hoạt động</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Chọn Icon</label>
                            <select
                                value={iconName}
                                onChange={(e) => setIconName(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all font-medium appearance-none"
                            >
                                {availableIcons.map(icon => (
                                    <option key={icon} value={icon}>{icon}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !name.trim() || !slug.trim()}
                            className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0066ff] hover:bg-[#0052cc] rounded-xl transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                        >
                            {isLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            {categoryData ? 'Lưu thay đổi' : 'Thêm danh mục'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
