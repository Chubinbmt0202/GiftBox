import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, Settings, Users, LogOut } from "lucide-react";

export function AdminLayout() {
    return (
        <div className="min-h-screen flex bg-primary-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-primary-100 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-primary-100">
                    <Link to="/admin" className="font-serif text-xl font-bold text-primary-900 tracking-tight">Miloo Admin</Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary-100 text-primary-900">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                        <Package className="w-5 h-5" />
                        Orders
                    </Link>
                    <Link to="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                        <Users className="w-5 h-5" />
                        Customers
                    </Link>
                    <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-900 transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-primary-100">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-primary-100 flex items-center justify-between px-6 md:px-8">
                    <h1 className="text-xl font-semibold text-primary-900">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-medium text-sm">
                            AD
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
