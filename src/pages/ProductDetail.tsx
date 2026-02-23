import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import { mockProducts, mockSets } from '../data/mockData';
import { Button } from '../components/ui/button';
import type { Product, GiftSet } from '../types';

export function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Check if it's a product or a set
    const productItem = mockProducts.find(p => p.id === id) as Product | undefined;
    const setItem = mockSets.find(s => s.id === id) as GiftSet | undefined;

    const item = productItem || setItem;
    const isSet = !!setItem;

    if (!item) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-warm-gray px-4">
                <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">Không tìm thấy sản phẩm</h2>
                <p className="text-primary-600 mb-8">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Button onClick={() => navigate('/ready-to-ship')} className="rounded-full shadow-md">
                    Quay lại cửa hàng
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-warm-gray min-h-screen py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-primary-500 mb-8 font-medium">
                    <Link to="/" className="hover:text-primary-900 transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/ready-to-ship" className="hover:text-primary-900 transition-colors">Quà có sẵn</Link>
                    <span>/</span>
                    <span className="text-primary-900 truncate max-w-[200px] sm:max-w-none">{item.name}</span>
                </div>

                <Link to="/ready-to-ship" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-10 transition-colors group font-semibold">
                    <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mr-3 group-hover:bg-primary-100 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </span>
                    Quay lại xem các mẫu khác
                </Link>

                <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 lg:p-12 shadow-sm border border-primary-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left: Image Gallery (Single Image for now) */}
                        <div className="space-y-6">
                            <div className="aspect-[4/5] sm:aspect-square bg-primary-50 rounded-[2rem] overflow-hidden relative border border-primary-100/50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                {item.badge && (
                                    <div className="absolute top-6 left-6 bg-primary-900 text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                                        {item.badge}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col pt-2 lg:pt-8">
                            {isSet && (
                                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full w-fit mb-4 uppercase tracking-widest">
                                    Combo Quà Tặng
                                </span>
                            )}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4 leading-tight">
                                {item.name}
                            </h1>

                            {item.rating && (
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1 bg-primary-50 px-3 py-1.5 rounded-full">
                                        <Star className="w-4 h-4 fill-primary-600 text-primary-600" />
                                        <span className="font-bold text-primary-900">{item.rating}</span>
                                    </div>
                                    <span className="text-primary-400 text-sm font-medium">
                                        {item.reviewsCount ? `${item.reviewsCount} đánh giá` : 'Chưa có đánh giá'}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-end gap-4 mb-8">
                                <span className="text-4xl sm:text-5xl font-bold text-primary-900 tracking-tight">
                                    ${item.price}
                                </span>
                                {item.originalPrice && (
                                    <span className="text-xl text-primary-400 line-through decoration-primary-300 mb-1">
                                        ${item.originalPrice}
                                    </span>
                                )}
                            </div>

                            <div className="prose prose-primary text-primary-600 mb-8 whitespace-pre-line leading-relaxed">
                                {item.description || "Đây là một sản phẩm tuyển chọn từ Miloostudios, đáp ứng đầy đủ tiêu chí thẩm mỹ và chất lượng."}
                            </div>

                            {/* Specifically for Sets - list items */}
                            {isSet && setItem?.items && (
                                <div className="mb-8 p-6 bg-primary-50/50 rounded-2xl border border-primary-100">
                                    <h3 className="font-serif font-bold text-lg text-primary-900 mb-4">Hộp quà này bao gồm:</h3>
                                    <ul className="space-y-3">
                                        {setItem.items.map((subItem, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                                                <span className="text-primary-700 font-medium">{subItem}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Trust badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pb-10 border-b border-primary-100 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                                        <Truck className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-medium text-primary-800 leading-tight">Giao hàng toàn quốc</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-medium text-primary-800 leading-tight">Đóng gói chuẩn Premium</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-medium text-primary-800 leading-tight">Chuẩn bị trong 2h</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <Button
                                    size="lg"
                                    className="flex-1 h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                                    onClick={() => alert('Đã thêm vào giỏ hàng!')}
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" /> Thêm vào giỏ hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
