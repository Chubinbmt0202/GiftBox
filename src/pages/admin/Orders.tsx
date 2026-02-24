import { Download, Plus, Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function AdminOrders() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Order Management</h1>
                    <p className="text-gray-500 font-medium">View and manage all customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Create Order
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <OrderStatCard title="Total Orders" value="1,248" trend="+12.5%" trendUp={true} />
                <OrderStatCard title="Pending" value="45" trend="-5%" trendUp={false} isWarning />
                <OrderStatCard title="Completed" value="1,102" trend="+8%" trendUp={true} />
                <OrderStatCard title="Total Revenue" value="$52,430" trend="+15.3%" trendUp={true} />
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">

                {/* Tabs & Filters */}
                <div className="p-5 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
                        <button className="px-4 py-2 text-[13px] font-bold text-[#0066ff] bg-[#f0f6ff] rounded-lg shrink-0">All Orders</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Processing</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Shipped</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Delivered</button>
                        <button className="px-4 py-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg shrink-0 transition-colors">Cancelled</button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative w-full sm:w-auto">
                            <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Filter by Date"
                                className="w-full sm:w-48 pl-9 pr-4 py-2 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] placeholder:text-gray-400 font-medium transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-between w-full sm:w-auto gap-2 bg-[#f8f9fa] border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <span className="flex items-center gap-2"><Filter className="w-4 h-4 text-gray-400" /> Status: All</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <OrderTableRow
                                id="#ORD-001" name="Sarah Johnson" email="sarah.j@example.com" initials="SJ" bgColor="bg-[#ffd8cc]" textColor="text-[#d9534f]"
                                date="Oct 24, 2023" total="$120.50" payment="Paid" status="Processing"
                            />
                            <OrderTableRow
                                id="#ORD-002" name="Michael Jones" email="mike.jones@test.com" initials="MJ" bgColor="bg-purple-100" textColor="text-purple-600"
                                date="Oct 23, 2023" total="$75.00" payment="Paid" status="Shipped"
                            />
                            <OrderTableRow
                                id="#ORD-003" name="David Smith" email="david.s@mail.com" initials="DS" bgColor="bg-gray-900" textColor="text-white"
                                date="Oct 22, 2023" total="$245.80" payment="Pending" status="Pending"
                            />
                            <OrderTableRow
                                id="#ORD-004" name="Emily Wilson" email="emily.w@example.com" initials="EW" bgColor="bg-emerald-100" textColor="text-emerald-600"
                                date="Oct 21, 2023" total="$54.20" payment="Paid" status="Delivered"
                            />
                            <OrderTableRow
                                id="#ORD-005" name="James Carter" email="james.c@work.com" initials="JC" bgColor="bg-amber-100" textColor="text-amber-600"
                                date="Oct 20, 2023" total="$890.00" payment="Failed" status="Cancelled"
                            />
                            <OrderTableRow
                                id="#ORD-006" name="Lisa Marie" email="lisa.m@test.com" initials="LM" bgColor="bg-pink-100" textColor="text-pink-600"
                                date="Oct 20, 2023" total="$35.99" payment="Paid" status="Shipped"
                            />
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                    <span className="text-[13px] font-medium text-gray-500">
                        Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">6</span> of <span className="font-bold text-gray-900">1,248</span> results
                    </span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 font-bold text-[13px] hover:text-gray-900 hover:bg-gray-50 transition-colors">
                            Previous
                        </button>
                        <button className="px-4 py-2 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">
                            Next
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

function OrderTableRow({ id, name, email, initials, bgColor, textColor, date, total, payment, status }: any) {
    const getPaymentStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'paid': return 'text-emerald-600';
            case 'pending': return 'text-amber-600';
            case 'failed': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getPaymentBullet = (s: string) => {
        switch (s.toLowerCase()) {
            case 'paid': return 'bg-emerald-500';
            case 'pending': return 'bg-amber-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'processing': return 'bg-[#e0e7ff] text-[#4f46e5]'; // Indigo
            case 'shipped': return 'bg-[#f0f6ff] text-[#0066ff]'; // Blue
            case 'delivered': return 'bg-emerald-50 text-emerald-600';
            case 'cancelled': return 'bg-red-50 text-red-600';
            case 'pending': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-50 text-gray-600';
        }
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
                    <span className="text-[12px] font-medium text-gray-500">2023</span>
                </div>
            </td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{total}</td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${getPaymentBullet(payment)}`}></span>
                    <span className={`text-[12px] font-bold ${getPaymentStyle(payment)}`}>
                        {payment}
                    </span>
                </div>
            </td>
            <td className="py-4 px-6">
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${getStatusStyle(status)}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-right">
                <button className="text-[13px] font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors">
                    View Details
                </button>
            </td>
        </tr>
    );
}
