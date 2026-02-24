import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, FileText, CreditCard, Package, Loader2 } from "lucide-react";
import { getOrderById, updateOrderStatus, type OrderData } from "../../services/orderService";

export function AdminOrderDetail() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<(OrderData & { id: string }) | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const data = await getOrderById(id);
                if (data) {
                    setOrder(data);
                } else {
                    setError("Không tìm thấy đơn hàng");
                }
            } catch (err) {
                console.error("Lỗi khi tải đơn hàng", err);
                setError("Có lỗi xảy ra khi tải đơn hàng");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#0066ff] rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium">Đang tải thông tin đơn hàng...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex flex-col items-center justify-center p-20">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Không thể tải đơn hàng</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <Link to="/admin/orders" className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    const dateObj = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
    const formattedDate = dateObj.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-200';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const translatePayment = (p: string) => {
        if (!p) return 'Đang chờ';
        if (p.toLowerCase() === 'cod') return 'Thanh toán khi nhận hàng (COD)';
        if (p.toLowerCase() === 'paid') return 'Đã thanh toán qua Thẻ/Chuyển khoản';
        return p;
    };

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!id || !order) return;

        const newStatus = e.target.value as OrderData['status'];
        setIsUpdatingStatus(true);
        try {
            await updateOrderStatus(id, newStatus);
            setOrder({ ...order, status: newStatus });
            alert("Đã cập nhật trạng thái đơn hàng thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại!");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/admin/orders" className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">Đơn hàng #{order.id.slice(0, 8).toUpperCase()}</h1>

                        <div className="relative flex items-center">
                            <select
                                value={order.status}
                                onChange={handleStatusChange}
                                disabled={isUpdatingStatus}
                                className={`px-3 py-1 text-xs font-bold rounded-full border outline-none appearance-none cursor-pointer pr-8 ${getStatusStyle(order.status)} ${isUpdatingStatus ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <option value="pending" className="bg-white text-gray-900">Đang chờ</option>
                                <option value="completed" className="bg-white text-gray-900">Thành công</option>
                                <option value="cancelled" className="bg-white text-gray-900">Đã huỷ</option>
                            </select>
                            {isUpdatingStatus && (
                                <Loader2 className="w-3 h-3 animate-spin absolute right-2 text-gray-500" />
                            )}
                            {!isUpdatingStatus && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg className={`h-3 w-3 ${getStatusStyle(order.status).split(' ')[1]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Đặt lúc {formattedDate}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-gray-400" />
                            Chi tiết hộp quà
                        </h2>

                        <div className="space-y-6">
                            {/* Box */}
                            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center font-bold text-gray-400">
                                        VỎ HỘP
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{order.boxName}</p>
                                        <p className="text-sm text-gray-500">Mã: {order.boxId}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900">${order.boxPrice.toFixed(2)}</span>
                            </div>

                            {/* Items */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Sản phẩm đi kèm</h3>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">IMG</div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">Mã: {item.id} &bull; SL: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-medium text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Card */}
                            {order.cardId && (
                                <div className="pt-4 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Thiệp đính kèm</h3>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg shrink-0 flex items-center justify-center font-bold text-gray-400 text-xs">
                                                    THIỆP
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{order.cardName}</p>
                                                    <p className="text-xs text-gray-500">Mã: {order.cardId}</p>
                                                </div>
                                            </div>
                                            <span className="font-medium text-gray-900 text-sm">${order.cardPrice.toFixed(2)}</span>
                                        </div>
                                        {/* Card Message */}
                                        {order.cardMessage && (
                                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                                <p className="text-xs text-gray-400 font-medium mb-1">Tin nhắn người mua gửi gắm:</p>
                                                <p className="text-sm text-gray-700 italic">"{order.cardMessage}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Info & Cost */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Tóm tắt thanh toán</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Thành tiền</span>
                                <span className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Phí vận chuyển</span>
                                <span className="font-semibold text-emerald-600">Miễn phí</span>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="font-bold text-gray-900">Tổng cộng</span>
                            <span className="text-xl font-bold text-[#0066ff]">${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Thông tin khách hàng</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{order.customerInfo.fullName}</p>
                                    <p className="text-sm text-gray-500 mt-1">{order.customerInfo.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-700">{order.customerInfo.phone}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-700">{order.customerInfo.email}</p>
                            </div>
                            {order.customerInfo.notes && (
                                <div className="bg-amber-50 rounded-lg p-3 text-sm mt-2 border border-amber-100">
                                    <span className="font-bold text-amber-800 block mb-1">Ghi chú giao hàng:</span>
                                    <span className="text-amber-700">{order.customerInfo.notes}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Thanh toán</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Phương thức</p>
                                <p className="text-sm text-gray-500 mt-0.5">{translatePayment(order.paymentMethod)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
