import { Download, Plus, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Mail, Eye, Users, UserPlus, CreditCard, Star } from "lucide-react";

export function AdminCustomers() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Customer Directory</h1>
                    <p className="text-gray-500 font-medium">View, manage and analyze your registered customer base.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <button className="flex items-center gap-2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone number..."
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] placeholder:text-gray-400 font-medium transition-all shadow-sm"
                    />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button className="flex items-center justify-between w-full sm:w-auto gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        Status: All
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="flex items-center justify-between w-full sm:w-auto gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                        Spending: Any
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-colors hidden sm:block">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
                <CustomerStatCard title="Total Customers" value="2,543" icon={<Users className="w-6 h-6 text-[#0066ff]" />} iconBg="bg-[#f0f6ff]" />
                <CustomerStatCard title="New This Month" value="+128" icon={<UserPlus className="w-6 h-6 text-emerald-600" />} iconBg="bg-emerald-50" />
                <CustomerStatCard title="Active Spenders" value="1,890" icon={<CreditCard className="w-6 h-6 text-purple-600" />} iconBg="bg-purple-50" />
                <CustomerStatCard title="VIP Members" value="45" icon={<Star className="w-6 h-6 text-amber-500" />} iconBg="bg-amber-50" />
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col mt-4">

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Orders</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Spend</th>
                                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <CustomerTableRow
                                name="John Doe" email="john.doe@example.com" phone="(555) 123-4567" status="Active" orders="12" spend="$1,240.00" image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                            />
                            <CustomerTableRow
                                name="Jane Smith" email="jane.smith@test.com" phone="(555) 987-6543" status="Active" orders="5" spend="$450.50" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                            />
                            <CustomerTableRow
                                name="Robert Brown" email="robert.b@mail.com" phone="(555) 456-7890" status="VIP" orders="28" spend="$3,100.25" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                            />
                            <CustomerTableRow
                                name="Emily White" email="emily.w@web.com" phone="(555) 222-3333" status="New" orders="1" spend="$85.00" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                            />
                            <CustomerTableRow
                                name="Michael Green" email="mike.g@site.com" phone="(555) 777-8888" status="Inactive" orders="15" spend="$1,500.75" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                            />
                            <CustomerTableRow
                                name="Sarah Connor" email="sarah.c@sky.net" phone="(555) 999-0000" status="Active" orders="42" spend="$4,250.00" image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                            />
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 bg-white">
                    <span className="text-[13px] font-medium text-gray-500">
                        Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">6</span> of <span className="font-bold text-gray-900">97</span> results
                    </span>
                    <div className="flex gap-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0066ff] text-white font-bold text-[13px] shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">3</button>
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">...</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-colors">10</button>
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

function CustomerStatCard({ title, value, icon, iconBg }: any) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBg}`}>
                {icon}
            </div>
            <div>
                <p className="text-[14px] font-bold text-gray-400 mb-1">{title}</p>
                <h2 className="text-3xl font-extrabold text-gray-900 leading-none">{value}</h2>
            </div>
        </div>
    );
}

function CustomerTableRow({ name, email, phone, status, orders, spend, image }: any) {
    const getStatusStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'active': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'vip': return 'bg-amber-50 text-amber-600 border border-amber-100';
            case 'new': return 'bg-[#f0f6ff] text-[#0066ff] border border-[#e0edff]';
            case 'inactive': return 'bg-gray-50 text-gray-500 border border-gray-200';
            default: return 'bg-gray-50 text-gray-600 border border-gray-200';
        }
    };

    return (
        <tr className="hover:bg-gray-50/50 transition-colors group">
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gray-100 shadow-sm overflow-hidden">
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-900">{name}</span>
                        <span className="text-[13px] font-medium text-[#0066ff]">{email}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6 text-[14px] font-medium text-[#0066ff]">{phone}</td>
            <td className="py-4 px-6">
                <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${getStatusStyle(status)}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{orders}</td>
            <td className="py-4 px-6 text-[14px] font-bold text-gray-900">{spend}</td>
            <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-[#0066ff] bg-[#f0f6ff] hover:bg-[#e0edff] rounded-lg transition-colors">
                        <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
