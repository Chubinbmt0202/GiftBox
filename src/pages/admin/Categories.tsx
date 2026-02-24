import { useState, useEffect } from 'react';
import {
    Plus, Search, Filter, Headphones, Shirt, Armchair,
    Activity, Book, Edit2, Trash2, ChevronLeft, ChevronRight,
    Tags, Package, Gift, Star
} from 'lucide-react';
import {
    type Category,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from '../../services/categoryService';
import { CategoryModal } from '../../components/admin/CategoryModal';

// Map string icon names to Lucide components
const IconMap: Record<string, any> = {
    Headphones,
    Shirt,
    Armchair,
    Activity,
    Book,
    Tags,
    Package,
    Gift,
    Star
};

export const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Fetch data
    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Failed to load categories", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // Handlers
    const handleAddNew = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
            try {
                await deleteCategory(id);
                await loadCategories(); // Reload list after delete
            } catch (error) {
                console.error("Failed to delete category", error);
                alert("Có lỗi xảy ra khi xóa danh mục.");
            }
        }
    };

    const handleSave = async (data: Omit<Category, 'id' | 'createdAt'>) => {
        if (editingCategory?.id) {
            await updateCategory(editingCategory.id, data);
        } else {
            await addCategory(data);
        }
        await loadCategories(); // Reload list after save
    };

    return (
        <div className="max-w-7xl mx-auto font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Danh mục sản phẩm</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Quản lý và tổ chức cấu trúc kho hàng của bạn.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-blue-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Thêm danh mục mới
                </button>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-200/50 overflow-hidden">
                {/* Toolbar */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            className="w-full pl-10 pr-4 py-2.5 bg-[#f8f9fa] border-none rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 placeholder:text-gray-400 font-medium transition-shadow"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select className="bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-[13px] text-gray-600 font-semibold focus:outline-none focus:border-gray-300 focus:ring-2 focus:ring-[#0066ff]/20 appearance-none cursor-pointer w-full sm:w-auto relative" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevron-down'%3E%3Cpath stroke='%236B7280' d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.25em" }}>
                            <option>Tất cả trạng thái</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <button className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white">
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Tên danh mục</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Slug</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Số sản phẩm</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Trạng thái</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-gray-300 border-t-[#0066ff] rounded-full animate-spin"></div>
                                            Đang tải danh mục...
                                        </div>
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <Tags className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="font-medium text-gray-900">Không tìm thấy danh mục</p>
                                            <p className="text-sm mt-1">Bắt đầu bằng cách tạo một danh mục mới.</p>
                                            <button
                                                onClick={handleAddNew}
                                                className="mt-4 text-[#0066ff] font-semibold text-sm hover:underline"
                                            >
                                                + Thêm danh mục
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => {
                                    const Icon = IconMap[cat.iconName] || Tags;

                                    return (
                                        <tr key={cat.id} className="hover:bg-[#f8f9fa]/50 transition-colors group bg-white">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-[#f4f6f8] flex items-center justify-center border border-gray-100/50 group-hover:bg-white group-hover:shadow-sm transition-all text-gray-400">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-[14px] text-gray-900">{cat.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-md bg-[#f4f6f8] text-[#5c6c80] text-[13px] font-mono font-medium">
                                                    {cat.slug}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[14px] text-gray-500 font-medium">
                                                    {typeof cat.count === 'string' && cat.count.includes('item') ? cat.count.replace('items', 'sản phẩm') : `${cat.count} sản phẩm`}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold
                          ${cat.status === 'Active'
                                                        ? 'bg-[#e8fbf0] text-[#1aa053]'
                                                        : 'bg-[#f4f6f8] text-[#8e98a8]'
                                                    }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${cat.status === 'Active' ? 'bg-[#1aa053]' : 'bg-[#a3abb8]'}`}></span>
                                                    {cat.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(cat)}
                                                        className="text-gray-400 hover:text-[#0066ff] transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-gray-400 hover:text-[#0066ff]" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id!, cat.name)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && categories.length > 0 && (
                    <div className="p-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-[13px] font-medium text-gray-500">
                            Hiển thị <span className="text-gray-900 font-bold">1</span> đến <span className="text-gray-900 font-bold">{categories.length}</span> của <span className="text-gray-900 font-bold">{categories.length}</span> kết quả
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border border-gray-200 bg-white opacity-50 cursor-not-allowed">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0066ff] text-white font-bold text-[13px] shadow-sm shadow-blue-500/20">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors border border-gray-200 bg-white opacity-50 cursor-not-allowed">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Create/Edit */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                categoryData={editingCategory}
            />
        </div>
    );
};
