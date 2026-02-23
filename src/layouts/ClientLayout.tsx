import { Outlet, Link } from "react-router-dom";
import { Menu, User, Gift, ShoppingCart } from "lucide-react";

export function ClientLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-primary-100 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-primary-700 hover:text-primary-900 transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        <Link to="/" className="flex items-center gap-2 group">
                            <Gift className="w-6 h-6 text-primary-500 group-hover:text-primary-600 transition-colors" />
                            <span className="font-serif text-xl font-bold tracking-tight text-primary-900">Miloostudios</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/build-a-box" className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">Build a Box</Link>
                        <Link to="/ready-to-ship" className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">Ready to Ship</Link>
                        <Link to="/corporate" className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">Corporate Gifting</Link>
                        <Link to="/about" className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">Our Story</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-primary-700 hover:text-primary-900 transition-colors hidden sm:block">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="py-2.5 px-6 bg-primary-900 text-white rounded-full text-sm font-medium hover:bg-primary-800 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
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
