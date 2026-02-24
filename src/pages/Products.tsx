import { useState, useEffect } from 'react';
import { ChevronDown, Star, Heart, Maximize, ShoppingBag, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, type Product } from '../services/productService';
import { getCategories, type Category } from '../services/categoryService';

export function Products() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load products and categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCategoryChange = (catName: string) => {
    setSelectedCategories(prev =>
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  const currentProducts = selectedCategories.length > 0
    ? products.filter(p => selectedCategories.includes(p.category))
    : products;

  return (
    <div className="min-h-screen bg-[#fffdf5] font-sans p-4 md:p-8 flex justify-center text-boonie-text">
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-8 items-start">

        {/* Mobile Filter Button */}
        <div className="lg:hidden w-full flex justify-end mb-4">
          <button
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm font-bold font-sans text-gray-700"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Left Sidebar (Desktop) / Mobile Drawer */}
        <div className={`
          fixed inset-0 z-[100] lg:relative lg:z-auto lg:inset-auto lg:block
          ${isMobileFilterOpen ? 'block' : 'hidden'}
        `}>
          {/* Mobile Overlay */}
          <div
            className="absolute inset-0 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="absolute top-0 right-0 w-4/5 max-w-[320px] h-full bg-white lg:bg-transparent lg:static lg:w-[360px] lg:h-auto overflow-y-auto lg:overflow-visible flex flex-col pt-6 lg:pt-0 sticky lg:top-28 z-10 transition-transform">

            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 mb-6 lg:hidden">
              <h3 className="font-fredoka font-bold text-xl text-gray-900">Filters</h3>
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Categories Block */}
            <div className="bg-white lg:rounded-xl p-6 lg:border-2 lg:border-[#fff3b0]/50 lg:shadow-sm">
              <h3 className="hidden lg:block font-fredoka font-bold text-xl text-gray-900 mb-4">Categories</h3>

              {/* Dashed line */}
              <div className="w-full border-t border-dashed border-[#fff3b0] mb-5"></div>

              <div className="flex flex-col gap-4">
                {categories.map((cat) => {
                  return (
                    <label key={cat.id} className="flex items-center justify-between cursor-pointer group" onClick={() => handleCategoryChange(cat.name)}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`text-[15px] font-semibold font-sans truncate ${selectedCategories.includes(cat.name) ? 'text-boonie-pink' : 'text-gray-700 group-hover:text-boonie-pink'}`}>
                          {cat.name}
                        </span>
                      </div>
                      <span className="bg-[#fff9e6] text-[#d4b200] font-bold text-xs px-3 py-1 rounded-full font-sans ml-2">
                        {cat.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header Banner */}
          <div className="bg-[#fff9e6] border-2 border-[#fff3b0] rounded-xl p-8 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-fredoka text-[#5c4033] mb-3 leading-tight flex items-center gap-3">
                Hello, Sunshine! ☀️
              </h1>
              <p className="text-[#8c6b5d] font-semibold text-lg max-w-lg font-sans">
                Brighten your day with our colorful collection of gifts & stationery.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm self-start lg:self-center cursor-pointer hover:border-[#fff3b0] transition-colors">
              <span className="text-sm font-medium text-gray-500 font-sans">Sort by:</span>
              <button className="flex items-center gap-2 font-bold text-gray-900 text-sm font-sans">
                Super Cute (Featured) <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20 w-full">
              <div className="w-8 h-8 border-4 border-[#fff3b0] border-t-boonie-pink rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-6 md:gap-y-10">
              {currentProducts.map((product) => {
                return (
                  <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col h-full cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-white w-full border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md mb-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Badge */}
                      {product.status === 'Low Stock' && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 rounded-full text-[11px] font-bold text-white shadow-sm font-sans z-10">
                          Sắp hết
                        </div>
                      )}
                      {product.status === 'Out of Stock' && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-gray-500 rounded-full text-[11px] font-bold text-white shadow-sm font-sans z-10">
                          Hết hàng
                        </div>
                      )}

                      {/* Hover Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors mt-0">
                            <Maximize className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Info Container */}
                    <div className="flex flex-col flex-1 px-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[13px] text-gray-400 font-medium font-sans truncate pr-2">{product.category}</span>
                        <div className="flex items-center gap-1 text-[13px] font-bold text-gray-800 shrink-0 font-sans">
                          <Star className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                          5.0
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-800 text-[15px] mb-1.5 font-sans truncate group-hover:text-[#c49a6c] transition-colors">
                        {product.name}
                      </h4>

                      <div className="flex items-center gap-2 mt-auto">
                        <span className="font-bold text-[15px] font-sans text-[#c49a6c]">
                          {Number(product.price).toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {!isLoading && currentProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-sans">
              Không tìm thấy sản phẩm nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
