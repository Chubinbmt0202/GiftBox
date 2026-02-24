import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Star, Sparkles, Gift } from 'lucide-react';
import { mockSets, mockProducts } from '../data/mockData';
import { Button } from '../components/ui/button';
import type { GiftSet, Product } from '../types';

export function ReadyToShip() {
    const [activeTheme, setActiveTheme] = useState<string>('all');
    const navigate = useNavigate();

    // Group thematic sets
    const themes = [
        { id: 'all', label: 'Tất cả' },
        { id: 'tet', label: 'Quà Tết Đoàn Viên' },
        { id: 'christmas', label: 'Giáng Sinh Ấm Áp' },
        { id: 'birthday', label: 'Mừng Sinh Nhật' },
        { id: 'anniversary', label: 'Tình Yêu & Kỷ Niệm' }
    ];

    const filteredSets = activeTheme === 'all'
        ? mockSets
        : mockSets.filter(set => set.theme === activeTheme);

    const bestSellers = mockSets.filter(set => set.rating && set.rating >= 4.9 || set.badge === 'Bestseller' || set.badge === 'Hot');

    const renderSetCard = (set: GiftSet) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            key={set.id}
            onClick={() => navigate(`/product/${set.id}`)}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-primary-100 transition-all cursor-pointer flex flex-col"
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-primary-50">
                <img
                    src={set.image}
                    alt={set.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {set.badge && (
                    <div className="absolute top-4 left-4 bg-primary-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 uppercase tracking-wider">
                        {set.badge}
                    </div>
                )}
                <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-bold text-xl text-primary-900 line-clamp-2 pr-4">{set.name}</h3>
                    {set.rating && (
                        <div className="flex items-center gap-1 bg-primary-50 text-primary-900 px-2.5 py-1 rounded-full text-sm font-bold shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {set.rating}
                        </div>
                    )}
                </div>

                <p className="text-primary-600 text-sm line-clamp-2 mb-4 flex-1">
                    {set.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {set.items.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="bg-primary-50 text-primary-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                            {item}
                        </span>
                    ))}
                    {set.items.length > 3 && (
                        <span className="bg-primary-50 text-primary-700 text-[11px] px-2.5 py-1 rounded-full font-medium">
                            +{set.items.length - 3} nữa
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary-100/60">
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-primary-900">${set.price}</span>
                        {set.originalPrice && (
                            <span className="text-sm text-primary-400 line-through decoration-primary-300/50">${set.originalPrice}</span>
                        )}
                    </div>
                    <Button className="rounded-full w-12 h-12 p-0 shadow-md group-hover:bg-primary-800 transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );

    const renderProductCard = (product: Product) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group bg-white rounded-3xl overflow-hidden shadow-[0_2px_15px_-5px_rgba(0,0,0,0.03)] hover:shadow-lg border border-primary-100/50 transition-all cursor-pointer"
        >
            <div className="aspect-square bg-primary-50 relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.badge && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.badge}
                    </div>
                )}
            </div>
            <div className="p-5">
                <h4 className="font-bold text-primary-900 line-clamp-1 mb-1">{product.name}</h4>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg text-primary-900">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-primary-400 line-through">${product.originalPrice}</span>
                        )}
                    </div>
                    {product.rating && (
                        <div className="flex items-center gap-1 text-sm font-semibold text-primary-700">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            {product.rating}
                        </div>
                    )}
                </div>
                <Button variant="outline" className="w-full rounded-xl border-primary-200 text-primary-700 hover:text-white hover:bg-primary-900 hover:border-primary-900 transition-colors font-semibold">
                    Thêm vào giỏ
                </Button>
            </div>
        </motion.div>
    );

    return (
        <div className="bg-warm-gray min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative bg-primary-900 text-white py-20 px-4 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop')] opacity-20 object-cover bg-cover bg-center mix-blend-overlay" />
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-50 text-sm font-medium mb-6 backdrop-blur-md border border-white/20">
                            <Gift className="w-4 h-4" /> Ready to Ship
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
                            Quà tặng được thiết kế sẵn cho bạn
                        </h1>
                        <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Khám phá các hộp quà tuyệt đẹp đã được Miloostudios tuyển chọn và đóng gói tỉ mỉ, sẵn sàng trao gửi yêu thương ngay lập tức.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10 md:mb-14">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-3 flex items-center gap-3">
                            Bán Chạy Nhất <Sparkles className="w-6 h-6 text-yellow-500" />
                        </h2>
                        <p className="text-primary-600 text-lg">Những set quà được yêu thích nhất bởi khách hàng của chúng tôi.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bestSellers.map(renderSetCard)}
                </div>
            </section>

            {/* Thematic Collections */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 relative">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none" />

                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                        Bộ Sưu Tập Theo Chủ Đề
                    </h2>
                    <p className="text-primary-600 text-lg max-w-2xl mx-auto">
                        Lọc các gợi ý quà tặng phù hợp nhất cho mọi dịp đặc biệt của bạn.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
                    {themes.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setActiveTheme(theme.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTheme === theme.id
                                ? 'bg-primary-900 text-white shadow-md scale-105'
                                : 'bg-white text-primary-600 border border-primary-200 hover:border-primary-400 hover:bg-primary-50'
                                }`}
                        >
                            {theme.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSets.map(renderSetCard)}
                    </AnimatePresence>
                </motion.div>

                {filteredSets.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-primary-100 mt-8">
                        <Gift className="w-12 h-12 text-primary-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-primary-900 mb-2">Đang cập nhật</h3>
                        <p className="text-primary-500">Bộ sưu tập này sắp ra mắt, vui lòng quay lại sau nhé!</p>
                    </div>
                )}
            </section>

            {/* Individual Products (Mga Sản phẩm rời) */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 border-t border-primary-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-900 mb-4">
                            Các Sản Phẩm Rời
                        </h2>
                        <p className="text-primary-600 text-lg max-w-xl">
                            Tìm kiếm những món quà nhỏ lẻ, đồ trang trí hoặc những món phụ kiện xinh xắn bán riêng biệt.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" />
                            <input
                                type="text"
                                placeholder="Tìm món đồ..."
                                className="w-full pl-11 pr-4 py-3 bg-white border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl h-12 px-4 border-primary-200 text-primary-700 bg-white hover:bg-primary-50 shrink-0">
                            <Filter className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {mockProducts.map(renderProductCard)}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-10 border-primary-300 text-primary-800 hover:bg-primary-900 hover:border-primary-900 hover:text-white transition-all font-bold group">
                        Xem tất cả sản phẩm
                        <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                    </Button>
                </div>
            </section>
        </div>
    );
}
