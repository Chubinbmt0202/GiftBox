import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { subscribeToNotifications, markNotificationAsRead, markAllNotificationsAsRead, type NotificationData } from "../services/notificationService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    BarChart2,
    Settings,
    LogOut,
    Search,
    Bell,
    HelpCircle,
    Tags,
    CheckCircle2
} from "lucide-react";

export function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [notifications, setNotifications] = useState<(NotificationData & { id: string })[]>([]);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = subscribeToNotifications((data) => {
            setNotifications(data);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotificationClick = async (notif: NotificationData & { id: string }) => {
        if (!notif.read) {
            await markNotificationAsRead(notif.id);
        }
        if (notif.link) {
            navigate(notif.link);
            setIsNotifOpen(false);
        }
    };

    const handleMarkAllRead = async () => {
        const unreadIds = notifications.filter(n => !n.read).map(n => n.id);
        if (unreadIds.length > 0) {
            await markAllNotificationsAsRead(unreadIds);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const navItems = [
        { path: "/admin", icon: LayoutDashboard, label: "Bảng điều khiển", exact: true },
        { path: "/admin/orders", icon: ShoppingCart, label: "Đơn hàng", exact: false },
        { path: "/admin/products", icon: Package, label: "Sản phẩm", exact: false },
        { path: "/admin/categories", icon: Tags, label: "Danh mục", exact: false },
        { path: "/admin/customers", icon: Users, label: "Khách hàng", exact: false },
        { path: "/admin/analytics", icon: BarChart2, label: "Thống kê", exact: false },
    ];

    const systemItems = [
        { path: "/admin/settings", icon: Settings, label: "Cài đặt", exact: false },
    ];

    // Map path to title for the header, or we can just read it from the active nav label
    const activeNavItem = [...navItems, ...systemItems].find(item => {
        if (item.exact) return location.pathname === item.path;
        return location.pathname.startsWith(item.path);
    });
    const pageTitle = activeNavItem ? activeNavItem.label : "Admin Dashboard";

    return (
        <div className="min-h-screen flex bg-[#f8f9fa] font-sans">

            {/* Sidebar */}
            <aside className="w-[260px] bg-white border-r border-gray-100 flex-col hidden md:flex shrink-0 sticky top-0 h-screen">

                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 mb-2 mt-2">
                    <Link to="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0066ff] rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-[18px] text-gray-900 tracking-tight">Quản trị</span>
                    </Link>
                </div>

                {/* User Info (Optional, like in Image 4/5) */}


                {/* Navigation */}
                <div className="flex-1 overflow-y-auto w-full px-4">
                    <nav className="space-y-1 mb-8">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${isActive
                                            ? "bg-[#f0f6ff] text-[#0066ff]"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        }`
                                    }
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="mb-2">
                        <h4 className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Hệ thống
                        </h4>
                        <nav className="space-y-1">
                            {systemItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${isActive
                                                ? "bg-[#f0f6ff] text-[#0066ff]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 mt-auto mb-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-[14px] font-semibold rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Top Header */}
                <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-10 w-full">

                    <div className="flex items-center gap-6 flex-1">
                        <h1 className="text-xl font-bold text-gray-900 hidden lg:block mr-2 w-48 truncate">{pageTitle}</h1>

                        {/* Search Bar */}
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-9 pr-4 py-2 bg-[#f8f9fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 placeholder:text-gray-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pl-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors mr-2"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white leading-none">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Notification Menu */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <h3 className="font-bold text-gray-900">Thông báo</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={handleMarkAllRead}
                                                className="text-xs font-semibold text-[#0066ff] hover:text-[#0052cc] flex items-center gap-1"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Đánh dấu đã đọc
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-[360px] overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-6 text-center text-sm text-gray-500 font-medium">Chưa có thông báo nào</div>
                                        ) : (
                                            <div className="divide-y divide-gray-50">
                                                {notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        onClick={() => handleNotificationClick(notif)}
                                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors block ${!notif.read ? 'bg-blue-50/30' : ''}`}
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-[#0066ff]' : 'bg-transparent'}`}></div>
                                                            <div>
                                                                <p className={`text-sm ${!notif.read ? 'text-gray-900 font-bold' : 'text-gray-700 font-medium'}`}>{notif.title}</p>
                                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                                                                <p className="text-[10px] font-semibold text-gray-400 mt-2 uppercase tracking-wide">
                                                                    {notif.createdAt?.toDate ? formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true, locale: vi }) : 'Vừa xong'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

                        <button className="flex items-center gap-2 pl-2">
                            <img src="https://ui-avatars.com/api/?name=Admin+User&background=ffd8cc&color=d9534f" alt="Admin" className="w-8 h-8 rounded-full border border-gray-100 shadow-sm" />
                            <div className="hidden sm:flex flex-col items-start translate-y-0.5">
                                <span className="text-[13px] font-bold text-gray-800 leading-none">Admin User</span>
                                <span className="text-[11px] font-medium text-gray-500 leading-tight">Super Admin</span>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
