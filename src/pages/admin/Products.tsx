import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import type { Product } from "../../services/productService";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../services/productService";
import { ProductModal } from "../../components/admin/ProductModal";

export function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Fetch data
    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handlers
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete the product "${name}"?`)) {
            try {
                await deleteProduct(id);
                await loadProducts(); // Reload list after delete
            } catch (error) {
                console.error("Lỗi khi xoá sản phẩm", error);
                alert("Có lỗi xảy ra khi xóa sản phẩm.");
            }
        }
    };

    const handleSave = async (data: Omit<Product, 'id' | 'createdAt' | 'status'>) => {
        if (editingProduct?.id) {
            await updateProduct(editingProduct.id, data);
        } else {
            await addProduct(data);
        }
        await loadProducts(); // Reload list after save
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Quản lý sản phẩm</h1>
                    <p className="text-gray-500 font-medium">Quản lý kho hàng, theo dõi số lượng và phân loại danh mục.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Thêm sản phẩm mới
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">

                {/* Search & Filters */}
                <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm theo tên hoặc SKU..."
                            className="w-full pl-9 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] placeholder:text-gray-400 font-medium transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                        <FilterButton label="Tất cả" active={true} />
                        <FilterButton label="Điện tử" />
                        <FilterButton label="Quần áo" />
                        <FilterButton label="Nhà cửa & Đời sống" />
                        <FilterButton label="Đồ chơi" />
                        <button className="p-2 ml-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors shrink-0">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hình ảnh</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tên sản phẩm</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mã SKU</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Danh mục</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Giá bán</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tồn kho</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="py-12 px-6 text-center text-gray-500">
                                        <div className="flex justify-center items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-gray-300 border-t-[#0066ff] rounded-full animate-spin"></div>
                                            Đang tải sản phẩm...
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-16 px-6 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <PackageOpen className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="font-medium text-gray-900">Không có sản phẩm nào</p>
                                            <p className="text-sm mt-1">Bắt đầu bằng cách tạo một sản phẩm mới.</p>
                                            <button
                                                onClick={handleAddNew}
                                                className="mt-4 text-[#0066ff] font-semibold text-sm hover:underline"
                                            >
                                                + Thêm sản phẩm
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <ProductTableRow
                                        key={product.id}
                                        product={product}
                                        onEdit={() => handleEdit(product)}
                                        onDelete={() => handleDelete(product.id!, product.name)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && products.length > 0 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                        <span className="text-[13px] font-medium text-gray-500">
                            Hiển thị <span className="font-bold text-gray-900">1</span> đến <span className="font-bold text-gray-900">{products.length}</span> của <span className="font-bold text-gray-900">{products.length}</span> kết quả
                        </span>
                        <div className="flex gap-1">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0066ff] text-white font-bold text-[13px] shadow-sm">1</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Modal for Create/Edit */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                productData={editingProduct}
            />

        </div>
    );
}

// --- Subcomponents ---

function FilterButton({ label, active }: { label: string, active?: boolean }) {
    return (
        <button
            className={`px-4 py-1.5 text-[13px] font-semibold rounded-lg shrink-0 transition-colors ${active
                ? "bg-[#0f172a] text-white shadow-sm"
                : "bg-[#f8f9fa] text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-100"
                }`}
        >
            {label}
        </button>
    );
}

function ProductTableRow({ product, onEdit, onDelete }: { product: Product, onEdit: () => void, onDelete: () => void }) {
    // Circle indicator color
    const getBulletColor = (s: string = '') => {
        switch (s.toLowerCase()) {
            case 'in stock': return 'bg-emerald-500';
            case 'low stock': return 'bg-amber-500';
            case 'out of stock': return 'bg-gray-400';
            default: return 'bg-gray-400';
        }
    };

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="py-4 px-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-1">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg mix-blend-multiply" />
                </div>
            </td>
            <td className="py-4 px-6">
                <h4 className="text-[14px] font-bold text-gray-900">{product.name}</h4>
            </td>
            <td className="py-4 px-6 text-[13px] font-medium text-gray-500">{product.sku}</td>
            <td className="py-4 px-6">
                <span className="px-2.5 py-1 text-[11px] font-bold text-[#0066ff] bg-[#f0f6ff] rounded-md">
                    {product.category}
                </span>
            </td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{product.price}đ</td>
            <td className="py-4 px-6 text-[13px] font-medium text-gray-500">{product.stock}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getBulletColor(product.status)}`}></span>
                    <span className={`text-[13px] font-bold ${product.status === 'In Stock' ? 'text-emerald-600' : product.status === 'Low Stock' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {product.status === 'In Stock' ? 'Còn hàng' : product.status === 'Low Stock' ? 'Sắp hết' : 'Hết hàng'}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="text-gray-400 hover:text-[#0066ff] transition-colors"
                        title="Sửa"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
