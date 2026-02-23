import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package, Sparkles, MailOpen, Plus, Search, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_BOXES = [
    { id: 1, name: "Classic Kraft Box", desc: "Sustainable & minimalist", price: 10, capacity: 6, image: "https://images.unsplash.com/photo-1572983792618-2adac7da9ec1?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Premium Black Box", desc: "Elegant & luxurious", price: 15, capacity: 8, image: "https://images.unsplash.com/photo-1607525389650-7117e3f53eff?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Large Wooden Box", desc: "Rustic & durable", price: 25, capacity: 12, image: "https://images.unsplash.com/photo-1454587399580-0a2db7936a23?q=80&w=400&auto=format&fit=crop" },
];

const ITEM_CATEGORIES = [
    "Tất cả", "Nến thơm", "Ly / cốc", "Sổ tay", "Vòng tay", "Thiệp", "Bút",
    "Hoa giấy", "Tất", "Cột tóc", "Túi thơm", "Bánh kẹo", "Gấu bông", "Sticker", "Phụ kiện gói (Bùi nhùi, Ruy băng)"
];

const MOCK_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Sản phẩm mẫu ${i + 1}`,
    category: ITEM_CATEGORIES[(i % (ITEM_CATEGORIES.length - 1)) + 1],
    price: Math.floor(Math.random() * 20 + 5),
    image: `https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=400&auto=format&fit=crop`
}));

const MOCK_CARDS = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Thiệp chúc mừng ${i + 1}`,
    price: Math.floor(Math.random() * 5 + 2),
    image: `https://images.unsplash.com/photo-1554181829-06b2fb55f242?q=80&w=400&auto=format&fit=crop`
}));

export function BuildABox() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    // Global Cart State
    const [selectedBox, setSelectedBox] = useState<typeof MOCK_BOXES[0] | null>(null);
    const [selectedItems, setSelectedItems] = useState<(typeof MOCK_PRODUCTS[0] & { quantity: number })[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [cardMessage, setCardMessage] = useState("");

    // Step 2 specific state
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("popular");

    const filteredAndSortedProducts = useMemo(() => {
        let result = MOCK_PRODUCTS;

        if (activeCategory !== "Tất cả") {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        }

        if (sortBy === "price-asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, searchQuery, sortBy]);

    const steps = [
        { id: 1, title: "Packaging", icon: Package },
        { id: 2, title: "Items", icon: Sparkles },
        { id: 3, title: "Card", icon: MailOpen },
    ];

    // --- Computed Cart Logic ---
    const totalItemsQuantity = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
    const boxCapacity = selectedBox ? selectedBox.capacity : 0;
    const spaceUsedPercentage = boxCapacity > 0 ? Math.min((totalItemsQuantity / boxCapacity) * 100, 100) : 0;

    const selectedCard = MOCK_CARDS.find(c => c.id === selectedCardId);
    const totalPrice = (selectedBox?.price || 0)
        + selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        + (selectedCard?.price || 0);

    // --- Actions ---
    const handleBoxSelect = (box: typeof MOCK_BOXES[0]) => {
        setSelectedBox(box);
        if (totalItemsQuantity > box.capacity) {
            alert(`Cảnh báo: Hộp mới chỉ chứa được ${box.capacity} món, bạn hiện đang chọn ${totalItemsQuantity} món!`);
        }
        setCurrentStep(2);
    };

    const handleItemAdd = (product: typeof MOCK_PRODUCTS[0], e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedBox) {
            alert("Vui lòng chọn hộp trước khi thêm sản phẩm.");
            setCurrentStep(1);
            return;
        }
        if (totalItemsQuantity >= selectedBox.capacity) {
            alert("Hộp đã đầy! Không thể thêm sản phẩm.");
            return;
        }

        setSelectedItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const handleItemRemove = (productId: number) => {
        setSelectedItems(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
            }
            return prev.filter(item => item.id !== productId);
        });
    };

    return (
        <div className="h-screen bg-warm-white flex flex-col overflow-hidden">
            {/* Build a Box Header */}
            <div className="bg-white border-b border-primary-100 sticky top-0 z-40">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center text-primary-600 hover:text-primary-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium">Exit</span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isPast = step.id < currentStep;

                            return (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => {
                                            if (step.id < currentStep) {
                                                setCurrentStep(step.id);
                                            } else if (step.id === 2 && selectedBox) {
                                                setCurrentStep(step.id);
                                            } else if (step.id === 3 && selectedBox) {
                                                setCurrentStep(step.id);
                                            }
                                        }}
                                        className={`flex items-center gap-2 transition-colors ${isActive ? 'text-primary-900' : isPast ? 'text-primary-500 hover:text-primary-700' : 'text-primary-300'}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-primary-900 bg-primary-50' : isPast ? 'border-primary-500 bg-white' : 'border-primary-200 bg-white'}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium hidden sm:block">{step.title}</span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 h-px mx-4 sm:w-20 ${isPast ? 'bg-primary-300' : 'bg-primary-100'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="font-medium text-primary-900 flex items-center gap-2">
                        <span className="text-primary-500 hidden sm:inline text-sm">Tổng cộng:</span>
                        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Main Content Area (Scrollable) */}
                <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-warm-gray">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-primary-600 mb-8">
                                {currentStep === 1 && "Choose a box style that sets the tone for your gift."}
                                {currentStep === 2 && "Select from our premium assortment of artisan goods."}
                                {currentStep === 3 && "Write a heartfelt message to complete the experience."}
                            </p>

                            {/* Step 1: Packaging */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {MOCK_BOXES.map(box => (
                                        <div
                                            key={box.id}
                                            onClick={() => handleBoxSelect(box)}
                                            className={`bg-white p-4 rounded-2xl border-2 cursor-pointer shadow-sm transition-all group ${selectedBox?.id === box.id
                                                ? 'border-primary-900 ring-2 ring-primary-900/10'
                                                : 'border-transparent hover:border-primary-200'
                                                }`}
                                        >
                                            <div className="aspect-square bg-primary-50 rounded-xl mb-4 overflow-hidden relative">
                                                <img src={box.image} alt={box.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/5 transition-colors"></div>
                                                {selectedBox?.id === box.id && (
                                                    <div className="absolute top-2 right-2 bg-primary-900 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-primary-900">{box.name}</h3>
                                            <p className="text-sm text-primary-600 mb-1">{box.desc}</p>
                                            <p className="text-xs font-semibold text-primary-500 mb-2">Chứa tối đa {box.capacity} món</p>
                                            <p className="font-medium text-primary-900">${box.price}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Items */}
                            {currentStep === 2 && (
                                <div className="flex flex-col">
                                    {/* Search and Sort Toolbar */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm sản phẩm..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white border border-primary-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all shadow-sm"
                                            />
                                        </div>
                                        <div className="relative w-full sm:w-56 shrink-0">
                                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full pl-10 pr-10 py-3 bg-white border border-primary-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent appearance-none cursor-pointer transition-all shadow-sm"
                                            >
                                                <option value="popular">Phổ biến nhất</option>
                                                <option value="price-asc">Giá: Thấp đến Cao</option>
                                                <option value="price-desc">Giá: Cao đến Thấp</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-400">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Filter - Horizontal Scroll */}
                                    <div className="flex overflow-x-auto pb-4 mb-6 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {ITEM_CATEGORIES.map(category => (
                                            <button
                                                key={category}
                                                onClick={() => setActiveCategory(category)}
                                                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                                    ? 'bg-primary-900 text-white shadow-md'
                                                    : 'bg-white text-primary-600 border border-primary-100 hover:border-primary-300 hover:text-primary-900'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Products Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        <AnimatePresence mode="popLayout">
                                            {filteredAndSortedProducts.map(product => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    transition={{ duration: 0.2 }}
                                                    key={product.id}
                                                    className="bg-white p-3 rounded-2xl border border-primary-100 hover:border-primary-300 hover:shadow-md transition-all group relative flex flex-col"
                                                >
                                                    <div className="aspect-square bg-primary-50 rounded-xl mb-3 overflow-hidden relative">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        <button
                                                            onClick={(e) => handleItemAdd(product, e)}
                                                            title={totalItemsQuantity >= boxCapacity ? "Hộp đã đầy" : "Thêm vào hộp"}
                                                            className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transform transition-all shadow-sm ${totalItemsQuantity >= boxCapacity
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-100 translate-y-0'
                                                                : 'bg-white/90 backdrop-blur-sm text-primary-900 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-primary-900 hover:text-white'
                                                                }`}
                                                        >
                                                            <Plus className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <div>
                                                            <p className="text-xs text-primary-500 font-medium mb-1 truncate">{product.category}</p>
                                                            <h3 className="font-bold text-primary-900 text-sm leading-tight mb-2 line-clamp-2">{product.name}</h3>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-auto">
                                                            <p className="font-semibold text-primary-700">${product.price}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {filteredAndSortedProducts.length === 0 && (
                                            <div className="col-span-full py-12 text-center text-primary-400">
                                                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Card and Message */}
                            {currentStep === 3 && (
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Card Selection */}
                                    <div className="flex-1">
                                        <h3 className="font-serif font-bold text-xl text-primary-900 mb-4">1. Chọn thiệp</h3>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {MOCK_CARDS.map(card => (
                                                <div
                                                    key={card.id}
                                                    onClick={() => setSelectedCardId(card.id)}
                                                    className={`bg-white p-3 rounded-2xl border-2 cursor-pointer transition-all ${selectedCardId === card.id
                                                        ? 'border-primary-900 shadow-md ring-2 ring-primary-900/20'
                                                        : 'border-transparent hover:border-primary-200'
                                                        }`}
                                                >
                                                    <div className="aspect-[4/3] bg-primary-50 rounded-xl mb-3 overflow-hidden">
                                                        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <h4 className="font-bold text-primary-900 text-sm">{card.name}</h4>
                                                    <p className="font-semibold text-primary-600 text-sm">${card.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message Area */}
                                    <div className="w-full md:w-80 lg:w-96 flex flex-col shrink-0">
                                        <h3 className="font-serif font-bold text-xl text-primary-900 mb-4">2. Viết lời nhắn</h3>
                                        <div className="bg-white p-6 rounded-3xl border border-primary-100 flex-1 flex flex-col shadow-sm">
                                            <p className="text-sm text-primary-600 mb-4">
                                                Lời nhắn của bạn sẽ được chúng tôi viết tay cẩn thận lên tấm thiệp đã chọn.
                                            </p>
                                            <textarea
                                                className="w-full flex-1 min-h-[200px] p-4 bg-primary-50/50 border border-primary-100 rounded-2xl resize-none text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:border-transparent transition-all"
                                                placeholder="Nhập lời nhắn yêu thương của bạn tại đây..."
                                                value={cardMessage}
                                                onChange={(e) => setCardMessage(e.target.value)}
                                            ></textarea>
                                            <div className="mt-4 text-right pr-2">
                                                <span className={`text-xs font-medium ${cardMessage.length > 200 ? 'text-red-500' : 'text-primary-400'}`}>
                                                    {cardMessage.length}/200
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Sidebar Space visualizer / Cart Preview (Fixed) */}
                <div className="w-full md:w-80 h-full overflow-y-auto overflow-x-hidden bg-white border-l border-primary-100 p-6 flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-10 shrink-0">
                    <h3 className="font-serif font-bold text-xl text-primary-900 mb-6 shrink-0">Your Box</h3>

                    <div className="flex-1 overflow-y-auto pr-2 mb-6 -mr-2 space-y-4">
                        {!selectedBox && !selectedCard && selectedItems.length === 0 && (
                            <div className="h-full border-2 border-dashed border-primary-200 rounded-2xl flex items-center justify-center p-6 bg-primary-50/50">
                                <div className="text-center text-primary-400">
                                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="font-medium text-sm">Hãy chọn một chiếc hộp để bắt đầu</p>
                                </div>
                            </div>
                        )}

                        {/* RENDER SELECTED BOX */}
                        {selectedBox && (
                            <div className="flex items-center gap-3 bg-warm-white p-3 rounded-xl border border-primary-100">
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-primary-50">
                                    <img src={selectedBox.image} alt={selectedBox.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-primary-500 font-medium mb-0.5">Hộp đóng gói</div>
                                    <h4 className="font-bold text-sm text-primary-900 truncate">{selectedBox.name}</h4>
                                    <p className="font-semibold text-primary-600 text-sm mt-0.5">${selectedBox.price}</p>
                                </div>
                            </div>
                        )}

                        {/* RENDER SELECTED ITEMS */}
                        {selectedItems.map(item => (
                            <div key={`cart-item-${item.id}`} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-primary-100 relative group">
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-primary-50">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-primary-900 line-clamp-2 leading-tight mb-1" title={item.name}>{item.name}</h4>
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-primary-600 text-sm">${item.price}</p>
                                        <div className="flex items-center gap-2 bg-primary-50 rounded-full px-2 py-0.5">
                                            <button
                                                onClick={() => handleItemRemove(item.id)}
                                                className="w-5 h-5 flex items-center justify-center text-primary-700 hover:bg-white rounded-full transition-colors"
                                            >-</button>
                                            <span className="text-xs font-bold text-primary-900 min-w-[12px] text-center">{item.quantity}</span>
                                            <button
                                                onClick={(e) => handleItemAdd(item, e)}
                                                className={`w-5 h-5 flex items-center justify-center rounded-full transition-colors ${totalItemsQuantity >= boxCapacity ? 'text-gray-400 cursor-not-allowed' : 'text-primary-700 hover:bg-white'
                                                    }`}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* RENDER SELECTED CARD */}
                        {selectedCard && (
                            <div className="flex items-center gap-3 bg-warm-white p-3 rounded-xl border border-primary-100">
                                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-primary-50">
                                    <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-primary-500 font-medium mb-0.5">Thiệp đính kèm</div>
                                    <h4 className="font-bold text-sm text-primary-900 truncate">{selectedCard.name}</h4>
                                    <p className="font-semibold text-primary-600 text-sm mt-0.5">${selectedCard.price}</p>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="space-y-4 shrink-0">
                        <div className="flex justify-between items-center text-sm font-medium text-primary-700">
                            <span>Sức chứa của hộp ({totalItemsQuantity}/{boxCapacity})</span>
                            <span>{Math.round(spaceUsedPercentage)}%</span>
                        </div>
                        <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${spaceUsedPercentage >= 100 ? 'bg-red-500' : 'bg-primary-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${spaceUsedPercentage}%` }}
                                transition={{ duration: 0.3 }}
                            ></motion.div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-primary-100 flex gap-4 shrink-0">
                        {currentStep > 1 && (
                            <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="outline" className="flex-1">
                                Back
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                if (currentStep === 1 && !selectedBox) {
                                    alert("Vui lòng chọn vỏ hộp trước khi tiếp tục!");
                                    return;
                                }
                                if (currentStep === 3) {
                                    navigate("/checkout", {
                                        state: { selectedBox, selectedItems, selectedCard, totalPrice }
                                    });
                                } else {
                                    setCurrentStep(prev => prev + 1);
                                }
                            }}
                            className="flex-1 shadow-md"
                        >
                            {currentStep === 3 ? "Complete" : "Next Step"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
