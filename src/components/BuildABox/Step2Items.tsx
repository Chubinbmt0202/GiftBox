import { Search, Plus, Minus, Heart, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, SelectedProduct } from "./data";
import type { Category } from "../../services/categoryService";

interface Props {
    activeCategory: string;
    setActiveCategory: (cat: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredAndSortedProducts: Product[];
    handleItemAdd: (product: Product, e: React.MouseEvent) => void;
    handleItemRemove: (id: string | number) => void;
    selectedItems: SelectedProduct[];
    totalItemsQuantity: number;
    boxCapacity: number;
    categories: Category[];
    isLoading: boolean;
}

export function Step2Items({
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filteredAndSortedProducts,
    handleItemAdd,
    handleItemRemove,
    selectedItems,
    totalItemsQuantity,
    boxCapacity,
    categories,
    isLoading
}: Props) {
    return (
        <div className="flex flex-col">
            {/* Top Bar: Categories and Search */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full lg:w-auto">
                    <button
                        onClick={() => setActiveCategory("Tất cả")}
                        className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${activeCategory === "Tất cả"
                            ? 'bg-[#2A2A2A] text-white'
                            : 'bg-white text-boonie-pink/70 hover:text-boonie-pink hover:bg-white/80'
                            }`}
                    >
                        Tất cả
                    </button>
                    {categories.slice(0, 5).map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.name)}
                            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${activeCategory === category.name
                                ? 'bg-[#2A2A2A] text-white'
                                : 'bg-white text-boonie-pink/70 hover:text-boonie-pink hover:bg-white/80'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-72 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white rounded-full text-sm text-gray-900 focus:outline-none shadow-sm font-sans placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 relative min-h-[300px]">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 rounded-xl">
                        <div className="w-10 h-10 border-4 border-[#fff3b0] border-t-boonie-pink rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <AnimatePresence mode="popLayout">
                            {filteredAndSortedProducts.map(product => {
                                const selectedItem = selectedItems.find(item => item.id === product.id);
                                const quantity = selectedItem ? selectedItem.quantity : 0;
                                const isFull = totalItemsQuantity >= boxCapacity;

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        key={product.id}
                                        className={`bg-white p-3 lg:p-4 rounded-xl border-2 transition-all group relative flex flex-col shadow-sm ${quantity > 0 ? 'border-boonie-pink' : 'border-transparent hover:border-gray-200 hover:-translate-y-1'
                                            }`}
                                    >
                                        <button className="absolute top-5 right-5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 hover:text-boonie-pink z-10 transition-colors">
                                            <Heart className="w-3.5 h-3.5 fill-current" />
                                        </button>

                                        <div className="aspect-[4/3] bg-[#f4ede4] rounded-xl mb-3 lg:mb-4 overflow-hidden relative flex items-center justify-center">
                                            <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            {quantity > 0 && (
                                                <div className="absolute inset-0 bg-white/20 flex flex-col items-center justify-center">
                                                    <span className="bg-boonie-pink text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">Đã thêm</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between px-1">
                                            <div className="mb-3">
                                                <div className="flex flex-col mb-1 gap-1">
                                                    <h3 className="font-bold text-gray-900 text-sm lg:text-base leading-tight font-fredoka line-clamp-2">{product.name}</h3>
                                                    <span className="text-boonie-pink font-semibold text-sm lg:text-base">{product.price.toLocaleString('vi-VN')} đ</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                {quantity > 0 ? (
                                                    <div className="flex items-center justify-between border border-gray-100 rounded-xl p-1 bg-gray-50/50">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleItemRemove(product.id); }}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-white shadow-sm rounded-lg"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="font-bold font-fredoka text-gray-900 w-8 text-center text-sm">{quantity}</span>
                                                        <button
                                                            onClick={(e) => handleItemAdd(product, e)}
                                                            className={`w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-lg ${isFull ? 'text-gray-300 cursor-not-allowed' : 'text-boonie-pink hover:bg-boonie-pink hover:text-white'}`}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={(e) => handleItemAdd(product, e)}
                                                        className={`w-full font-bold font-sans text-xs rounded-xl py-2 flex items-center justify-center gap-1.5 transition-colors ${isFull
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-[#f4ede4] text-gray-900 hover:bg-[#e8dfd3]'
                                                            }`}
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Thêm vào hộp
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {filteredAndSortedProducts.length === 0 && (
                            <div className="col-span-full py-20 text-center text-gray-400">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p className="font-fredoka">Không tìm thấy sản phẩm.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {filteredAndSortedProducts.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <button className="px-8 py-3 rounded-full border border-[#e8dfd3] bg-transparent text-gray-900 font-bold font-sans hover:bg-white transition-colors">
                        Xem thêm sản phẩm
                    </button>
                </div>
            )}
        </div>
    );
}
