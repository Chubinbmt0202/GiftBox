import { Plus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

export function AdminProducts() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Product Management</h1>
                    <p className="text-gray-500 font-medium">Manage your inventory, track stock, and organize categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Plus className="w-5 h-5" />
                        Add New Product
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
                            placeholder="Search products by name or SKU..."
                            className="w-full pl-9 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] placeholder:text-gray-400 font-medium transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                        <FilterButton label="All Items" active={true} />
                        <FilterButton label="Electronics" />
                        <FilterButton label="Clothing" />
                        <FilterButton label="Home & Garden" />
                        <FilterButton label="Toys" />
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
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">SKU</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <ProductTableRow
                                image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80"
                                name="Smart Watch Series 7" sku="SW-S7-001" category="Electronics" price="$399.00" stock="45 units" status="In Stock"
                            />
                            <ProductTableRow
                                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80"
                                name="Premium Wireless Headphones" sku="WH-P-02" category="Audio" price="$249.99" stock="12 units" status="Low Stock"
                            />
                            <ProductTableRow
                                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80"
                                name="Running Sneakers Flex" sku="RS-F-09" category="Fashion" price="$120.00" stock="150 units" status="In Stock"
                            />
                            <ProductTableRow
                                image="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=100&q=80"
                                name="Camera Macro Lens 50mm" sku="CML-50-X" category="Photography" price="$450.00" stock="0 units" status="Out of Stock"
                            />
                            <ProductTableRow
                                image="https://images.unsplash.com/photo-1572569433096-22a8ec7ee2e8?w=100&q=80"
                                name="Mechanical Keyboard RGB" sku="MK-RGB-87" category="Electronics" price="$159.00" stock="30 units" status="In Stock"
                            />
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                    <span className="text-[13px] font-medium text-gray-500">
                        Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">5</span> of <span className="font-bold text-gray-900">97</span> results
                    </span>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0066ff] text-white font-bold text-[13px] shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">8</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
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

function ProductTableRow({ image, name, sku, category, price, stock, status }: any) {
    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'in stock': return 'text-emerald-600 bg-emerald-50';
            case 'low stock': return 'text-amber-600 bg-amber-50';
            case 'out of stock': return 'text-gray-500 bg-gray-100';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    // Circle indicator color
    const getBulletColor = (s: string) => {
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
                    <img src={image} alt={name} className="w-full h-full object-contain rounded-lg mix-blend-multiply" />
                </div>
            </td>
            <td className="py-4 px-6">
                <h4 className="text-[14px] font-bold text-gray-900">{name}</h4>
            </td>
            <td className="py-4 px-6 text-[13px] font-medium text-gray-500">{sku}</td>
            <td className="py-4 px-6">
                <span className="px-2.5 py-1 text-[11px] font-bold text-[#0066ff] bg-[#f0f6ff] rounded-md">
                    {category}
                </span>
            </td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{price}</td>
            <td className="py-4 px-6 text-[13px] font-medium text-gray-500">{stock}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getBulletColor(status)}`}></span>
                    <span className={`text-[13px] font-bold ${status.toLowerCase() === 'in stock' ? 'text-emerald-600' : status.toLowerCase() === 'low stock' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {status}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6 text-right">
                <button className="p-2 text-gray-400 hover:text-[#0066ff] hover:bg-[#f0f6ff] rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}
