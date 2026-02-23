
import React, { useState } from 'react';
import {
  Search, ShoppingBag, User, Heart, Facebook, Twitter, Instagram,
  Youtube, Maximize, Star, ChevronDown, Check, X, Truck, CreditCard, HeadphonesIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCategories, mockProducts } from '../data/mockData';
import type { CartItem } from '../types';

const Products: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Constants to match the green styling from user image
  const theme = {
    topBarBg: '#2E4C33', // Dark green matching the image
    topBarText: '#E6EFE8',
    textMain: '#222222',
    textLight: '#777777',
    accent: '#D7A84B', // Gold/yellow for stars/price if needed
    greenAccent: '#2E4C33',
    bgLight: '#F9F9F9',
    badgeGreen: '#1A4A28'
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const currentProducts = selectedCategories.length > 0
    ? mockProducts.filter(p => selectedCategories.includes(p.categoryId))
    : mockProducts;

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="w-full text-xs py-2 px-6 flex justify-between items-center" style={{ backgroundColor: theme.topBarBg, color: theme.topBarText }}>
        <div>Call Us : +123-456-789</div>
        <div>
          Sign up and GET 20% OFF for your first order. <a href="#" className="underline font-semibold ml-1 text-white">Sign up now</a>
        </div>
        <div className="flex gap-4">
          <Facebook size={14} /><Twitter size={14} /><Instagram size={14} /><Youtube size={14} />
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="w-full py-5 px-6 md:px-12 flex justify-between items-center bg-white border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ color: theme.greenAccent }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: theme.greenAccent }}>B</div>
          Boomie Shop.
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-green-800 transition-colors">Home</Link>
          <Link to="/products" className="text-green-800 border-b-2 border-green-800 pb-1">Shop</Link>
          <a href="#" className="hover:text-green-800 transition-colors">Skin Care</a>
          <a href="#" className="hover:text-green-800 transition-colors">Makeup</a>
          <a href="#" className="hover:text-green-800 transition-colors">Hair Care</a>
          <a href="#" className="hover:text-green-800 transition-colors">About Us</a>
          <a href="#" className="hover:text-green-800 transition-colors">Blogs</a>
        </nav>

        <div className="flex gap-5 text-gray-600">
          <Search size={20} className="cursor-pointer hover:text-green-800" />
          <Heart size={20} className="cursor-pointer hover:text-green-800" />
          <div className="relative cursor-pointer hover:text-green-800" onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <User size={20} className="cursor-pointer hover:text-green-800" />
        </div>
      </header>

      {/* PAGE TITLE BREADCRUMB */}
      <div className="w-full py-12 md:py-16 flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: theme.bgLight }}>
        <h1 className="text-4xl font-bold mb-3">Shop</h1>
        <div className="text-sm font-medium text-gray-500 flex gap-2">
          <Link to="/" className="hover:text-gray-800">Home</Link>
          <span>/</span>
          <span className="text-gray-800">Shop</span>
        </div>
        {/* Decorative dots based on image */}
        <div className="absolute top-4 left-[10%] md:left-[20%] opacity-20 text-4xl tracking-widest text-gray-400">
          <span className="tracking-[6px]">•••••</span><br />
          <span className="tracking-[6px]">.••••</span><br />
          <span className="tracking-[6px]">..•••</span>
        </div>
        <div className="absolute bottom-4 right-[10%] md:right-[20%] opacity-20 text-4xl tracking-widest text-gray-400 text-right">
          <span className="tracking-[6px]">•••••</span><br />
          <span className="tracking-[6px]">••••.</span><br />
          <span className="tracking-[6px]">•••..</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-10">

        {/* SIDEBAR FILTERS */}
        <div className="w-full lg:w-[250px] shrink-0">
          <h2 className="font-bold text-lg mb-6 text-gray-900">Filter Options</h2>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900">By Categories</h3>
            <div className="space-y-3">
              {mockCategories.slice(0, 6).map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w - 4 h - 4 border rounded - sm flex items - center justify - center transition - colors ${selectedCategories.includes(cat.id) ? 'bg-green-800 border-green-800' : 'border-gray-300 group-hover:border-green-800'} `}>
                    {selectedCategories.includes(cat.id) && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text - [13px] ${selectedCategories.includes(cat.id) ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-800'} `}>
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* By Theme / Skin Type placeholder */}
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900">By Skin Type</h3>
            <div className="space-y-3">
              {['Normal', 'Oily', 'Dry', 'Combination', 'Sensitive'].map((type, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 border border-gray-300 rounded-sm group-hover:border-green-800"></div>
                  <span className="text-[13px] text-gray-500 hover:text-gray-800">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900">Price</h3>
            <div className="text-[13px] text-gray-500 mb-4">$10.00 - $100.00</div>
            <div className="w-full h-1 bg-gray-200 rounded-full relative">
              <div className="absolute left-[10%] right-[30%] h-full rounded-full" style={{ backgroundColor: theme.greenAccent }}></div>
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-900 border-2 border-white hover:scale-110 cursor-pointer shadow-sm"></div>
              <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-green-900 border-2 border-white hover:scale-110 cursor-pointer shadow-sm"></div>
            </div>
          </div>

          {/* Review */}
          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900">Review</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(stars => (
                <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w - 4 h - 4 border rounded - sm flex items - center justify - center transition - colors ${stars === 5 ? 'bg-yellow-400 border-yellow-400' : 'border-gray-200 group-hover:border-yellow-400'} `}>
                    {stars === 5 && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex gap-[2px] text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i >= stars ? "text-gray-300" : ""} />
                    ))}
                  </div>
                  <span className="text-[13px] text-gray-500">{stars} Star</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-0">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900">Availability</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border bg-green-800 border-green-800 rounded-sm flex items-center justify-center">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-[13px] text-gray-900 font-medium">In Stock</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-gray-300 rounded-sm group-hover:border-green-800"></div>
                <span className="text-[13px] text-gray-500">Out of Stocks</span>
              </label>
            </div>
          </div>
        </div>

        {/* MAIN PRODUCT GRID AREA */}
        <div className="flex-1">

          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-[14px] text-gray-500 font-medium">Showing 1-{currentProducts.length} of {mockProducts.length} results</div>
            <div className="flex items-center gap-3 text-[14px]">
              <span className="text-gray-500">Sort by :</span>
              <button className="flex items-center justify-between w-[160px] px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 font-medium">
                Default Sorting <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[13px] text-gray-500 font-medium mr-2">Active Filter</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-white bg-green-900 cursor-pointer">
              Price : $10.00 - $100.00 <X size={12} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-white bg-green-900 cursor-pointer">
              Best Seller <X size={12} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-white bg-green-900 cursor-pointer">
              In Stock <X size={12} />
            </div>
            <button className="text-[13px] text-[#D7A84B] font-semibold underline ml-2 hover:opacity-80">
              Clear All
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mb-12">
            {currentProducts.map(product => {
              const category = mockCategories.find(c => c.id === product.categoryId)?.name || 'Khác';
              return (
                <div key={product.id} className="group flex flex-col cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-square md:aspect-[4/5] mb-4 bg-[#F2EDE7] rounded-xl overflow-hidden shadow-sm">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mixture-blend-multiply" />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 text-[11px] font-bold text-white rounded-full tracking-wide shadow-sm" style={{ backgroundColor: theme.topBarBg }}>
                        {product.badge}
                      </div>
                    )}

                    {/* Hover Action Icons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-green-800 hover:bg-green-50">
                        <Heart size={16} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-green-800 hover:bg-green-50">
                        <Maximize size={16} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-green-800 hover:bg-green-50">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[13px] text-gray-400 font-medium">{category}</span>
                    <div className="flex items-center gap-1 text-[13px] font-bold text-black border-yellow-400">
                      <Star size={12} className="fill-yellow-400 text-yellow-400 mb-[1px]" />
                      {product.rating?.toFixed(1) || "5.0"}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-2 truncate">{product.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[15px]" style={{ color: theme.accent }}>${(product.price / 1000).toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-[14px] text-gray-400 line-through font-medium">${(product.originalPrice / 1000).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1.5 mt-8">
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-800">&lt;</button>
            <button className="w-8 h-8 rounded-full bg-green-900 text-white text-[13px] font-bold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-full text-gray-600 text-[13px] font-bold hover:bg-gray-100 flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-full text-gray-600 text-[13px] font-bold hover:bg-gray-100 flex items-center justify-center">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 rounded-full text-gray-600 text-[13px] font-bold hover:bg-gray-100 flex items-center justify-center">10</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-800">&gt;</button>
          </div>

        </div>
      </main>

      {/* FOOTER FEATURES */}
      <div className="w-full bg-white border-t border-gray-100 py-16 mt-10">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex items-start gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 flex-shrink-0 bg-[#F6F7F6] rounded-full flex items-center justify-center text-green-800">
              <Truck size={22} className="text-[#D7A84B]" />
            </div>
            <div className="pt-1">
              <h4 className="font-bold text-gray-900 text-[15px] mb-1">Free Shipping</h4>
              <p className="text-[13px] text-gray-500">Free shipping for order above $50</p>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-center">
            <div className="w-12 h-12 flex-shrink-0 bg-[#F6F7F6] rounded-full flex items-center justify-center text-green-800">
              <CreditCard size={22} className="text-[#D7A84B]" />
            </div>
            <div className="pt-1">
              <h4 className="font-bold text-gray-900 text-[15px] mb-1">Flexible Payment</h4>
              <p className="text-[13px] text-gray-500">Multiple secure payment options</p>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-center md:justify-end">
            <div className="w-12 h-12 flex-shrink-0 bg-[#F6F7F6] rounded-full flex items-center justify-center text-green-800">
              <HeadphonesIcon size={22} className="text-[#D7A84B]" />
            </div>
            <div className="pt-1">
              <h4 className="font-bold text-gray-900 text-[15px] mb-1">24x7 Support</h4>
              <p className="text-[13px] text-gray-500">We support online all days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
