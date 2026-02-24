import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, Plus, Calendar, ChevronDown } from "lucide-react";
import { getAllOrders, type OrderData } from "../../services/orderService";

export function AdminOrders() {
    const [orders, setOrders] = useState<(OrderData & { id: string })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Derived Stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Quản lý Đơn hàng</h1>
                    <p className="text-gray-500 font-medium">Xem và quản lý tất cả đơn hàng của khách hàng.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Xuất file
                    </button>
                    <button className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Tạo đơn hàng
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <OrderStatCard title="Tổng đơn hàng" value={totalOrders.toString()} trend="+0%" trendUp={true} />
                <OrderStatCard title="Đang chờ" value={pendingOrders.toString()} trend="+0%" trendUp={false} isWarning />
                <OrderStatCard title="Thành công" value={completedOrders.toString()} trend="+0%" trendUp={true} />
                <OrderStatCard title="Tổng doanh thu" value={`$${totalRevenue.toFixed(2)}`} trend="+0%" trendUp={true} />
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">

                {/* Tabs & Filters */}
                <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                        <button className="px-4 py-2 text-[13px] font-bold text-[#0066ff] bg-[#f0f6ff] rounded-lg shrink-0">Tất cả</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Đang chờ</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Thành công</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Đã huỷ</button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative w-full sm:w-auto">
                            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Lọc theo ngày"
                                className="w-full sm:w-48 pl-9 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] placeholder:text-gray-400 font-medium transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-between w-full sm:w-auto gap-2 bg-[#f8f9fa] border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <span className="flex items-center gap-2"><Filter className="w-4 h-4 text-gray-400" /> Trạng thái: Tất cả</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mã đơn</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Khách hàng</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ngày đặt</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tổng tiền</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Thanh toán</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-20 text-center">
                                        <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#0066ff] rounded-full animate-spin"></div>
                                        <p className="text-gray-500 mt-2 font-medium">Đang tải dữ liệu...</p>
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-20 text-center text-gray-500 font-medium">
                                        Chưa có đơn hàng nào
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, idx) => {
                                    const dateObj = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
                                    const formattedDate = dateObj.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });

                                    // Generate consistent pseudo-random colors for initials based on name
                                    const colors = [
                                        { bg: 'bg-[#ffd8cc]', text: 'text-[#d9534f]' },
                                        { bg: 'bg-purple-100', text: 'text-purple-600' },
                                        { bg: 'bg-emerald-100', text: 'text-emerald-600' },
                                        { bg: 'bg-amber-100', text: 'text-amber-600' },
                                        { bg: 'bg-pink-100', text: 'text-pink-600' }
                                    ];
                                    const colorStyle = colors[idx % colors.length];

                                    const nameParts = order.customerInfo.fullName.split(' ');
                                    let initials = "C";
                                    if (nameParts.length >= 2) {
                                        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
                                    } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
                                        initials = nameParts[0].substring(0, 2).toUpperCase();
                                    }

                                    return (
                                        <OrderTableRow
                                            key={order.id}
                                            rawId={order.id}
                                            id={order.id.slice(0, 8).toUpperCase()} // show short ID
                                            name={order.customerInfo.fullName}
                                            email={order.customerInfo.email}
                                            initials={initials}
                                            bgColor={colorStyle.bg}
                                            textColor={colorStyle.text}
                                            date={formattedDate}
                                            rawDateObj={dateObj}
                                            total={`$${order.totalAmount?.toFixed(2) || '0.00'}`}
                                            payment={order.paymentMethod || "Pending"}
                                            status={order.status}
                                        />
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                    <span className="text-[13px] font-medium text-gray-500">
                        Hiển thị <span className="font-bold text-gray-900">1</span> đến <span className="font-bold text-gray-900">{orders.length}</span> trong tổng số <span className="font-bold text-gray-900">{orders.length}</span> kết quả
                    </span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 font-bold text-[13px] hover:text-gray-900 hover:bg-gray-50 transition-colors">
                            Trước
                        </button>
                        <button className="px-4 py-2 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">
                            Sau
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- Subcomponents ---

function OrderStatCard({ title, value, trend, trendUp, isWarning }: any) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <p className="text-[13px] font-bold text-gray-500">{title}</p>
                <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${isWarning
                    ? 'bg-amber-50 text-amber-600'
                    : trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                    {trend}
                </div>
            </div>
            <h2 className="text-[28px] font-bold text-gray-900 leading-none">{value}</h2>
        </div>
    );
}

function Filter({ className }: any) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
    );
}

function OrderTableRow({ rawId, id, name, email, initials, bgColor, textColor, date, total, payment, status, rawDateObj }: any) {
    const getPaymentStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'paid': return 'text-emerald-600';
            case 'pending': return 'text-amber-600';
            case 'failed': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-200';
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200';
            default: return 'bg-gray-50 text-gray-600 border-gray-200';
        }
    };

    const translateStatus = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'Thành công';
            case 'cancelled': return 'Đã huỷ';
            case 'pending': return 'Đang chờ';
            default: return s;
        }
    };

    const translatePayment = (p: string) => {
        if (!p) return 'Đang chờ';
        if (p.toLowerCase() === 'cod') return 'Thanh toán COD';
        if (p.toLowerCase() === 'paid') return 'Đã thanh toán';
        return p;
    };

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{id}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${bgColor} ${textColor}`}>
                        {initials}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900">{name}</span>
                        <span className="text-[12px] font-medium text-gray-500">{email}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-gray-900">{date}</span>
                    <span className="text-[12px] font-medium text-gray-500">{rawDateObj?.getFullYear() || "2023"}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{total}</td>
            <td className="py-4 px-6 text-[14px] font-bold">
                <span className={getPaymentStyle(payment)}>
                    {translatePayment(payment)}
                </span>
            </td>
            <td className="py-4 px-6">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyle(status)}`}>
                    {translateStatus(status)}
                </span>
            </td>
            <td className="py-4 px-6 text-right">
                <Link to={`/admin/orders/${rawId}`} className="text-[13px] font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors">
                    Chi tiết
                </Link>
            </td>
        </tr>
    );
}
