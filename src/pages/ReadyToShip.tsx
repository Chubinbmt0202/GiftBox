import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockSets, mockProducts } from '../data/mockData';
import type { GiftSet, Product } from '../types';

export function ReadyToShip() {
    const navigate = useNavigate();

    const renderSetCard = (set: GiftSet) => (
        <div
            key={set.id}
            onClick={() => navigate(`/product/${set.id}`)}
            className="group relative aspect-[4/3] rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        >
            <img
                src={set.image}
                alt={set.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />

            {/* Badge */}
            {set.badge && (
                <div className="absolute top-5 left-5 bg-[#ffd8cc] text-[#d9534f] text-[10px] font-bold px-3 py-1.5 rounded-full z-10 uppercase tracking-wider">
                    {set.badge}
                </div>
            )}

            {/* Title */}
            <h3 className="absolute bottom-6 left-6 font-bold text-2xl text-white z-10">
                {set.name}
            </h3>
        </div>
    );

    const renderProductCard = (product: Product) => (
        <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer flex flex-col"
        >
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1 truncate">
                    {product.name}
                </h4>
                <div className="text-[#ff4d6d] font-semibold text-sm">
                    ${product.price.toFixed(2)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-[#fcfcfc] min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* --- CURATED SETS SECTION --- */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div className="max-w-2xl">
                            <span className="text-[#ff4d6d] text-[10px] font-bold tracking-widest uppercase mb-3 block">
                                Hộp Quà Có Sẵn
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                Curated Sets
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Thoughtfully picked, beautifully packed. Each box is designed to deliver a specific feeling of joy and warmth.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 text-[#ff4d6d] font-semibold text-sm hover:opacity-80 transition-opacity whitespace-nowrap pb-1">
                            View All Sets
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Lấy 4 item đầu tiên để tạo layout 2x2 như hình */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockSets.slice(0, 4).map(renderSetCard)}
                    </div>
                </section>


                {/* --- SINGLE ITEMS SECTION --- */}
                <section>
                    <div className="mb-10">
                        <span className="text-[#ff4d6d] text-[10px] font-bold tracking-widest uppercase mb-3 block">
                            Mua Lẻ
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                            Single Items
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base">
                            Pick individual pieces to add to your collection or build your own dream box.
                        </p>
                    </div>

                    {/* Layout 4 cột (hoặc 2 cột trên mobile) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {mockProducts.map(renderProductCard)}
                    </div>
                </section>

            </div>
        </div>
    );
}