import {
    Banknote,
    ShoppingCart,
    Users,
    Percent,
    TrendingUp,
    TrendingDown,
    Download
} from "lucide-react";

export function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Overview</h1>
                    <p className="text-gray-500 font-medium">Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-gray-400 bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm">
                        Last updated: Just now
                    </span>
                    <button className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Revenue"
                    value="$12,450"
                    trend="+12%"
                    icon={<Banknote className="w-5 h-5 text-[#0066ff]" />}
                    iconBg="bg-[#f0f6ff]"
                    trendUp={true}
                />
                <StatCard
                    title="New Orders"
                    value="154"
                    trend="+5%"
                    icon={<ShoppingCart className="w-5 h-5 text-[#8b5cf6]" />}
                    iconBg="bg-[#f5f3ff]"
                    trendUp={true}
                />
                <StatCard
                    title="Total Customers"
                    value="1,240"
                    trend="+18%"
                    icon={<Users className="w-5 h-5 text-[#f97316]" />}
                    iconBg="bg-[#fff7ed]"
                    trendUp={true}
                />
                <StatCard
                    title="Conversion Rate"
                    value="3.2%"
                    trend="-1%"
                    icon={<Percent className="w-5 h-5 text-[#ef4444]" />}
                    iconBg="bg-[#fef2f2]"
                    trendUp={false}
                />
            </div>

            {/* Charts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Trends */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
                            <p className="text-[13px] text-gray-500 font-medium mt-0.5">Monthly revenue growth</p>
                        </div>
                        <div className="flex bg-gray-50 p-1 rounded-xl">
                            <button className="px-4 py-1.5 text-[13px] font-semibold text-gray-500 rounded-lg hover:text-gray-900 transition-colors">Week</button>
                            <button className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#0066ff] rounded-lg shadow-sm">Month</button>
                            <button className="px-4 py-1.5 text-[13px] font-semibold text-gray-500 rounded-lg hover:text-gray-900 transition-colors">Year</button>
                        </div>
                    </div>
                    {/* Faux Chart */}
                    <div className="relative flex-1 min-h-[250px] mt-4">
                        {/* Horizontal Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-full border-b border-dashed border-gray-200"></div>
                            ))}
                        </div>
                        {/* SVG Wave */}
                        <div className="absolute inset-0 pt-2 pb-6">
                            <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#0066ff" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#0066ff" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M0,150 C100,100 200,140 300,140 C400,140 450,50 500,50 C550,50 650,110 750,110 C800,110 800,0 800,0 L800,200 L0,200 Z"
                                    fill="url(#gradient)"
                                />
                                <path
                                    d="M0,150 C100,100 200,140 300,140 C400,140 450,50 500,50 C550,50 650,110 750,110 C800,110 800,0 800,0"
                                    fill="none"
                                    stroke="#0066ff"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Value Point (simulated) */}
                                <circle cx="500" cy="50" r="5" fill="white" stroke="#0066ff" strokeWidth="3" />
                                <g transform="translate(500, 30)">
                                    <rect x="-30" y="-25" width="60" height="20" rx="4" fill="#1f2937" />
                                    <text x="0" y="-11" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">$8,240</text>
                                </g>
                            </svg>
                        </div>
                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-0 w-full flex justify-between text-[12px] font-semibold text-gray-400 px-4">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Top Products</h3>
                        <button className="text-[13px] font-semibold text-[#0066ff] hover:text-[#0052cc] transition-colors">View All</button>
                    </div>

                    <div className="flex flex-col gap-5 flex-1">
                        <ProductRow
                            name="Smart Watch Pro"
                            category="Electronics"
                            price="$320"
                            sales="1.2k sales"
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&q=80"
                        />
                        <ProductRow
                            name="Wireless Headphones"
                            category="Audio"
                            price="$199"
                            sales="854 sales"
                            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80"
                        />
                        <ProductRow
                            name="Running Sneakers"
                            category="Fashion"
                            price="$125"
                            sales="630 sales"
                            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80"
                        />
                        <ProductRow
                            name="Macro Lens 50mm"
                            category="Photography"
                            price="$450"
                            sales="320 sales"
                            image="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=100&q=80"
                        />
                    </div>

                    <button className="w-full mt-6 py-2.5 text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 border-t border-gray-50 pt-4">
                        Show more products
                    </button>
                </div>

            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransactionRow id="#ORD-001" customer="Alex Morgan" product="Wireless Mouse" date="Oct 24, 2023" amount="$45.00" status="Completed" />
                            <TransactionRow id="#ORD-002" customer="Sarah Jenkins" product="Mechanical Keyboard" date="Oct 24, 2023" amount="$120.00" status="Pending" />
                            <TransactionRow id="#ORD-003" customer="David Copper" product="USB-C Hub" date="Oct 23, 2023" amount="$35.00" status="Completed" />
                            <TransactionRow id="#ORD-004" customer="Emily Chen" product="MacBook Pro Case" date="Oct 22, 2023" amount="$65.00" status="Cancelled" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// --- Subcomponents ---

function StatCard({ title, value, trend, icon, iconBg, trendUp }: any) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-md ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-[13px] font-bold text-gray-400 mb-1">{title}</p>
                <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
            </div>
        </div>
    );
}

function ProductRow({ name, category, price, sales, image }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={image} alt={name} className="w-12 h-12 rounded-xl object-cover bg-gray-50 border border-gray-100" />
                <div>
                    <h4 className="text-[14px] font-bold text-gray-900 line-clamp-1">{name}</h4>
                    <p className="text-[12px] font-medium text-gray-400">{category}</p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[14px] font-bold text-gray-900">{price}</div>
                <div className="text-[12px] font-medium text-emerald-600">{sales}</div>
            </div>
        </div>
    );
}

function TransactionRow({ id, customer, product, date, amount, status }: any) {
    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-600';
            case 'pending': return 'bg-amber-50 text-amber-600';
            case 'cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td className="py-4 px-4 text-[13px] font-bold text-[#0066ff]">{id}</td>
            <td className="py-4 px-4 text-[14px] font-semibold text-gray-900">{customer}</td>
            <td className="py-4 px-4 text-[14px] font-medium text-gray-500">{product}</td>
            <td className="py-4 px-4 text-[13px] font-medium text-gray-500">{date}</td>
            <td className="py-4 px-4 text-[14px] font-bold text-gray-900">{amount}</td>
            <td className="py-4 px-4">
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${getStatusStyle(status)}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
