import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle, Shield, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { createOrder, type OrderData } from "../services/orderService";

interface CheckoutState {
    selectedBox?: any;
    selectedItems?: any[];
    selectedCard?: any;
    cardMessage?: string;
    totalPrice?: number;
}

export function Checkout() {
    const location = useLocation();
    const state = location.state as CheckoutState | null;
    const [currentStep, setCurrentStep] = useState(1);

    // Delivery Form State
    const [customerInfo, setCustomerInfo] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        notes: ""
    });

    const steps = [
        { id: 1, title: "Xem lại đơn hàng" },
        { id: 2, title: "Thông tin giao hàng" },
        { id: 3, title: "Thanh toán" },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!state || !state.selectedBox) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-16 h-16 text-primary-400 mb-4" />
                <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">Giỏ hàng trống</h2>
                <p className="text-primary-600 mb-6 text-center max-w-md">
                    Có vẻ như bạn chưa chọn sản phẩm nào cho hộp quà của mình. Quay lại để tiếp tục tạo hộp quà nhé!
                </p>
                <Link to="/build-a-box">
                    <Button>Bắt đầu tạo hộp quà</Button>
                </Link>
            </div>
        );
    }

    const { selectedBox, selectedItems = [], selectedCard, cardMessage = "", totalPrice = 0 } = state;

    const handleOrderSubmit = async () => {
        if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
            alert("Vui lòng điền đầy đủ các trường thông tin giao hàng có dấu (*)");
            setCurrentStep(2);
            return;
        }

        setIsSubmitting(true);
        try {
            const orderItems = selectedItems.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || item.imageUrl
            }));

            const orderData: Omit<OrderData, 'createdAt' | 'status'> = {
                customerInfo,
                paymentMethod: 'COD', // For now, defaulting to COD as other ones are visually disabled
                items: orderItems,
                cardMessage: cardMessage,
                boxId: selectedBox.id,
                boxName: selectedBox.name,
                boxPrice: selectedBox.price,
                cardId: selectedCard?.id || '',
                cardName: selectedCard?.name || '',
                cardPrice: selectedCard?.price || 0,
                totalAmount: totalPrice,
            };

            await createOrder(orderData);
            alert("Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.");
            // Ideally redirect back to home or a success page:
            // window.location.href = '/';
        } catch (error) {
            console.error("Order submit failed:", error);
            alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sáu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-warm-gray min-h-screen w-full py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link to="/build-a-box" className="inline-flex items-center text-primary-600 hover:text-primary-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span>Quay lại chỉnh sửa phần hộp quà</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Checkout Form */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                        {/* Stepper Header */}
                        <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl border border-primary-100 shadow-sm">
                            {steps.map((step, index) => {
                                const isActive = currentStep === step.id;
                                const isPast = currentStep > step.id;
                                return (
                                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                                        <div className={`flex items-center gap-2 ${isActive || isPast ? 'text-primary-900' : 'text-primary-300'}`}>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${isActive ? 'bg-primary-900 border-primary-900 text-white' : isPast ? 'bg-primary-50 border-primary-500 text-primary-900' : 'bg-white border-primary-200'}`}>
                                                {isPast ? <CheckCircle className="w-4 h-4" /> : step.id}
                                            </div>
                                            <span className="font-serif font-bold text-sm md:text-base hidden sm:block">{step.title}</span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`flex-1 h-px mx-4 ${isPast ? 'bg-primary-900' : 'bg-primary-100'}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Step 1: Review Order */}
                        {currentStep === 1 && (
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-100 shadow-sm">
                                <h2 className="text-2xl font-serif font-bold text-primary-900 mb-6">Chi tiết hộp quà của bạn</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 border border-primary-100 rounded-xl bg-primary-50">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white">
                                            <img src={selectedBox.image} alt={selectedBox.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-primary-500 font-medium mb-1">Hộp ngoài</p>
                                            <h4 className="font-bold text-primary-900">{selectedBox.name}</h4>
                                            <p className="font-medium text-primary-600">${selectedBox.price}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-medium text-primary-900 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" /> Sản phẩm bên trong
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedItems.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 p-3 border border-primary-100 rounded-xl">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-primary-50">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm text-primary-900 line-clamp-1">{item.name}</h4>
                                                        <div className="flex justify-between items-center mt-1">
                                                            <p className="text-sm text-primary-600">${item.price}</p>
                                                            <span className="text-xs font-medium bg-primary-50 px-2 py-1 rounded-full text-primary-900">SL: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 border border-primary-100 rounded-xl bg-primary-50 p-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white">
                                                <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-primary-500 font-medium mb-1">Thiệp đính kèm</p>
                                                <h4 className="font-bold text-primary-900">{selectedCard.name}</h4>
                                                <p className="font-medium text-primary-600">${selectedCard.price}</p>
                                            </div>
                                        </div>
                                        {cardMessage && (
                                            <div className="bg-white p-3 rounded-lg border border-primary-100/50 mt-1 relative">
                                                <p className="text-xs text-primary-400 font-medium mb-1">Lời nhắn viết tay:</p>
                                                <p className="text-sm font-sans text-gray-700 italic w-full break-words">"{cardMessage}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <Button onClick={() => setCurrentStep(2)} className="px-8 shadow-md">
                                        Tiếp tục giao hàng
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Delivery Info */}
                        {currentStep === 2 && (
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-100 shadow-sm">
                                <h2 className="text-2xl font-serif font-bold text-primary-900 mb-6">Thông tin giao hàng</h2>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-primary-900">Họ và tên người nhận *</label>
                                            <input type="text" value={customerInfo.fullName} onChange={e => setCustomerInfo({ ...customerInfo, fullName: e.target.value })} className="w-full px-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all" placeholder="Nhập họ và tên..." />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-primary-900">Số điện thoại *</label>
                                            <input type="tel" value={customerInfo.phone} onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} className="w-full px-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all" placeholder="Nhập số điện thoại..." />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-primary-900">Email người nhận (Để nhận mã vận đơn)</label>
                                        <input type="email" value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} className="w-full px-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all" placeholder="Nhập địa chỉ email..." />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-primary-900">Địa chỉ cụ thể *</label>
                                        <input type="text" value={customerInfo.address} onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })} className="w-full px-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..." />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-primary-900">Ghi chú giao hàng</label>
                                        <textarea value={customerInfo.notes} onChange={e => setCustomerInfo({ ...customerInfo, notes: e.target.value })} className="w-full px-4 py-3 bg-primary-50/50 border border-primary-100 rounded-xl min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all" placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."></textarea>
                                    </div>
                                </form>
                                <div className="mt-8 flex justify-between">
                                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                                        Quay lại
                                    </Button>
                                    <Button onClick={() => setCurrentStep(3)} className="px-8 shadow-md">
                                        Tiếp tục thanh toán
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {currentStep === 3 && (
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-100 shadow-sm">
                                <h2 className="text-2xl font-serif font-bold text-primary-900 mb-6">Phương thức thanh toán</h2>
                                <div className="space-y-4">
                                    <label className="flex items-start gap-4 p-5 border-2 border-primary-900 bg-primary-50/50 rounded-xl cursor-pointer">
                                        <input type="radio" name="payment" className="w-5 h-5 text-primary-900 mt-0.5" defaultChecked />
                                        <div>
                                            <span className="font-bold text-primary-900 block mb-1">Thanh toán khi nhận hàng (COD)</span>
                                            <p className="text-sm text-primary-600">Thanh toán bằng tiền mặt khi bưu tá giao hàng tới địa chỉ của bạn.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-4 p-5 border-2 border-transparent hover:border-primary-200 bg-white shadow-[0_0_15px_-5px_rgba(0,0,0,0.05)] rounded-xl cursor-pointer transition-all">
                                        <input type="radio" name="payment" className="w-5 h-5 text-primary-900 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-primary-900 block mb-1">Chuyển khoản ngân hàng</span>
                                            <p className="text-sm text-primary-600">Thực hiện thanh toán vào tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ được xử lý sau khi tiền được nhân.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-4 p-5 border-2 border-transparent hover:border-primary-200 bg-white shadow-[0_0_15px_-5px_rgba(0,0,0,0.05)] rounded-xl cursor-pointer transition-all">
                                        <input type="radio" name="payment" className="w-5 h-5 text-primary-900 mt-0.5" disabled />
                                        <div className="opacity-60">
                                            <span className="font-bold text-primary-900 block mb-1 flex items-center gap-2">Thẻ tín dụng/Ghi nợ <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">Bảo trì</span></span>
                                            <p className="text-sm text-primary-600">Thanh toán an toàn qua cổng VNPay/MoMo.</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-8 flex justify-between">
                                    <Button variant="outline" onClick={() => setCurrentStep(2)} disabled={isSubmitting}>
                                        Quay lại
                                    </Button>
                                    <Button onClick={handleOrderSubmit} className="px-8 shadow-md" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang xử lý...
                                            </>
                                        ) : (
                                            `Xác nhận đặt hàng ($${totalPrice.toFixed(2)})`
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary-100 shadow-sm sticky top-28">
                            <h2 className="text-xl font-serif font-bold text-primary-900 mb-6">Tóm tắt đơn hàng</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary-600">Hộp quà ({selectedBox.name})</span>
                                    <span className="font-medium text-primary-900">${selectedBox.price}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary-600">Sản phẩm ({selectedItems.reduce((acc, item) => acc + item.quantity, 0)} món)</span>
                                    <span className="font-medium text-primary-900">${selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
                                </div>
                                {selectedCard && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-primary-600">Thiệp ({selectedCard.name})</span>
                                        <span className="font-medium text-primary-900">${selectedCard.price}</span>
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-primary-100 w-full mb-6" />

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary-600">Tạm tính</span>
                                    <span className="font-medium text-primary-900">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-primary-600">Phí giao hàng</span>
                                    <span className="font-medium text-green-600">Miễn phí</span>
                                </div>
                            </div>

                            <div className="h-px bg-primary-100 w-full mb-6" />

                            <div className="flex justify-between items-end mb-8">
                                <span className="font-serif font-bold text-lg text-primary-900">Tổng cộng</span>
                                <span className="font-serif font-bold text-3xl text-primary-900">${totalPrice}</span>
                            </div>

                            <div className="bg-primary-50 p-4 rounded-xl flex items-start gap-3 text-sm text-primary-700">
                                <Shield className="w-5 h-5 text-primary-500 shrink-0" />
                                <p>Thông tin thanh toán của bạn được bảo mật an toàn với chuẩn mã hóa SSL.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
