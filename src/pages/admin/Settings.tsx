import { Store, Upload } from "lucide-react";

export function AdminSettings() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">General Settings</h1>
                <p className="text-gray-500 font-medium">Manage your store's core details, branding, and operational preferences.</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                    <button className="py-4 px-1 border-b-2 border-[#0066ff] text-[15px] font-bold text-[#0066ff]">General</button>
                    <button className="py-4 px-1 border-b-2 border-transparent text-[15px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">Payments</button>
                    <button className="py-4 px-1 border-b-2 border-transparent text-[15px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">Shipping</button>
                    <button className="py-4 px-1 border-b-2 border-transparent text-[15px] font-semibold text-gray-500 hover:text-gray-900 transition-colors">Notifications</button>
                </nav>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Forms) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Store Identity */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Store Identity</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-2">Store Name</label>
                                <input
                                    type="text"
                                    defaultValue="Modern Shop Inc."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Contact Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-400 font-medium">✉</span>
                                        </div>
                                        <input
                                            type="email"
                                            defaultValue="support@modernshop.com"
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-400 font-medium">📞</span>
                                        </div>
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 000-0000"
                                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-2">Store Description</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Premium electronics and gadgets for the modern lifestyle."
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Location Details</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-2">Address Line 1</label>
                                <input
                                    type="text"
                                    defaultValue="123 Commerce Blvd"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        defaultValue="San Francisco"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        defaultValue="94103"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[13px] font-bold text-gray-700 mb-2">Country</label>
                                <div className="relative">
                                    <select className="appearance-none w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all">
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className="space-y-8">

                    {/* Store Branding */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Store Branding</h2>

                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-[#0066ff] transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-[#f0f6ff] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Store className="w-8 h-8 text-[#0066ff]" />
                            </div>
                            <h4 className="text-[15px] font-bold text-gray-900 mb-1">Click to upload logo</h4>
                            <p className="text-[12px] font-medium text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                        </div>
                    </div>

                    {/* Store Features */}
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Store Features</h2>

                        <div className="space-y-6">
                            <ToggleFeature
                                title="Maintenance Mode"
                                description="Temporarily disable store access"
                                enabled={false}
                            />
                            <ToggleFeature
                                title="Guest Checkout"
                                description="Allow purchases without account"
                                enabled={true}
                            />
                            <ToggleFeature
                                title="Reviews"
                                description="Enable product reviews"
                                enabled={true}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 mt-6">
                <button className="px-6 py-2.5 text-[14px] font-bold text-gray-600 hover:text-gray-900 transition-colors">
                    Discard Changes
                </button>
                <button className="px-8 py-2.5 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-xl text-[14px] font-bold shadow-sm transition-colors">
                    Save Configuration
                </button>
            </div>

        </div>
    );
}

// --- Subcomponents ---

function ToggleFeature({ title, description, enabled }: any) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-[14px] font-bold text-gray-900">{title}</h4>
                <p className="text-[12px] font-medium text-gray-500 mt-0.5">{description}</p>
            </div>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${enabled ? 'bg-[#0066ff]' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
        </div>
    );
}
