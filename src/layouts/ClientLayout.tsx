import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, Smile, Search, User, ShoppingBag, Gift, X } from "lucide-react";

export function ClientLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();

    const handleUserClick = async () => {
        if (!user) {
            navigate('/login');
        } else {
            if (role === 'admin') {
                navigate('/admin');
            } else {
                if (window.confirm('Bạn có muốn đăng xuất không?')) {
                    await logout();
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-boonie-bg font-fredoka text-boonie-text">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full bg-white">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Left: Logo & Nav */}
                    <div className="flex items-center gap-12 border-none">
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 hover:text-boonie-pink transition-colors -ml-2"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-[#FF6B98] rounded-full flex items-center justify-center">
                                    <Smile className="w-6 h-6 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="font-fredoka text-[32px] font-bold tracking-tight text-[#FF6B98] mt-1">boonie</span>
                            </Link>
                        </div>

                        <nav className="hidden lg:flex items-center gap-8 mt-1">
                            <Link to="/ready-to-ship" className="text-lg font-bold text-boonie-text hover:text-boonie-pink transition-colors">Shop</Link>
                            <Link to="/build-a-box" className="text-lg font-bold text-boonie-text hover:text-boonie-pink transition-colors">Build the Box</Link>
                            <Link to="/products" className="text-lg font-bold text-boonie-text hover:text-boonie-pink transition-colors">Products</Link>
                            <Link to="/about" className="text-lg font-bold text-boonie-text hover:text-boonie-pink transition-colors">About</Link>
                        </nav>
                    </div>

                    {/* Right: Search & Actions */}
                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center relative">
                            <input
                                type="text"
                                placeholder="Find happiness..."
                                className="w-64 h-12 pl-6 pr-12 rounded-full border-none focus:ring-2 focus:ring-boonie-pink/50 text-[15px] font-medium bg-white shadow-sm placeholder:text-gray-400 outline-none"
                            />
                            <button className="absolute right-4 text-[#FF6B98] hover:scale-110 transition-transform">
                                <Search className="w-5 h-5" strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={handleUserClick} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF6B98] shadow-sm hover:shadow-md transition-shadow">
                                <User className="w-5 h-5" strokeWidth={2.5} />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-[#FF6B98] flex items-center justify-center text-white shadow-sm hover:shadow-md transition-shadow relative">
                                <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF9BB3] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-[3px] border-boonie-bg">
                                    2
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] lg:hidden">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-xl flex flex-col pt-6 px-6">
                            <div className="flex items-center justify-between mb-8">
                                <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="w-8 h-8 bg-[#FF6B98] rounded-full flex items-center justify-center">
                                        <Smile className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>
                                    <span className="font-fredoka text-[24px] font-bold tracking-tight text-[#FF6B98] mt-1">boonie</span>
                                </Link>
                                <button className="p-2 hover:text-boonie-pink" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-6 mt-4">
                                <Link to="/ready-to-ship" className="text-xl font-bold text-boonie-text hover:text-boonie-pink" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                                <Link to="/build-a-box" className="text-xl font-bold text-boonie-text hover:text-boonie-pink" onClick={() => setIsMobileMenuOpen(false)}>Build the Box</Link>
                                <Link to="/products" className="text-xl font-bold text-boonie-text hover:text-boonie-pink" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                                <Link to="/about" className="text-xl font-bold text-boonie-text hover:text-boonie-pink" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                            </nav>

                            <div className="mt-12 flex items-center relative">
                                <input
                                    type="text"
                                    placeholder="Find happiness..."
                                    className="w-full h-12 pl-6 pr-12 rounded-full border border-gray-200 focus:border-boonie-pink focus:ring-1 focus:ring-boonie-pink text-[15px] font-medium bg-white shadow-sm placeholder:text-gray-400 outline-none"
                                />
                                <button className="absolute right-4 text-[#FF6B98] hover:scale-110 transition-transform">
                                    <Search className="w-5 h-5" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-primary-900 text-primary-50 py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Gift className="w-6 h-6 text-primary-200" />
                            <span className="font-serif text-xl font-bold tracking-tight text-white">Miloostudios</span>
                        </div>
                        <p className="text-primary-200 text-sm leading-relaxed max-w-xs">
                            Curated gift boxes for every occasion. Bringing moments of joy through thoughtful gifting.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Shop</h4>
                        <ul className="space-y-2 text-sm text-primary-200">
                            <li><Link to="/build-a-box" className="hover:text-white transition-colors">Build a Box</Link></li>
                            <li><Link to="/ready-to-ship" className="hover:text-white transition-colors">Ready to Ship</Link></li>
                            <li><Link to="/corporate" className="hover:text-white transition-colors">Corporate</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Help</h4>
                        <ul className="space-y-2 text-sm text-primary-200">
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-white">Stay in the loop</h4>
                        <p className="text-sm text-primary-200 mb-4">Subscribe for updates on new collections and exclusive offers.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-primary-800 border-none rounded-lg px-4 py-2 text-sm text-white placeholder:text-primary-400 focus:ring-2 focus:ring-primary-400 focus:outline-none flex-1"
                            />
                            <button
                                type="submit"
                                className="bg-primary-500 hover:bg-primary-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-primary-800 text-sm text-primary-400 text-center">
                    <p>&copy; {new Date().getFullYear()} Miloostudios. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
