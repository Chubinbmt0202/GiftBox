import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import type { Box, SelectedProduct, Product } from "../components/BuildABox/data";
import { getProducts } from "../services/productService";
import { getCategories, type Category } from "../services/categoryService";
import { BuildABoxHeader } from "../components/BuildABox/BuildABoxHeader";
import { Step1Packaging } from "../components/BuildABox/Step1Packaging";
import { Step2Items } from "../components/BuildABox/Step2Items";
import { Step3Card } from "../components/BuildABox/Step3Card";
import { CartPreviewSidebar } from "../components/BuildABox/CartPreviewSidebar";

export function BuildABox() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    const [selectedBox, setSelectedBox] = useState<Box | null>(null);
    const [selectedItems, setSelectedItems] = useState<SelectedProduct[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string | number | null>(null);
    const [cardMessage, setCardMessage] = useState("");

    // Step 2 specific state
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
                const mappedProducts = prods.map(p => ({
                    id: p.id!,
                    name: p.name,
                    category: p.category, // Assuming p.category is already the category name
                    price: Number(p.price),
                    image: p.imageUrl,
                    imageUrl: p.imageUrl,
                    status: p.status
                }));
                // Optionally filter out 'Out of Stock' items here, or handle in UI
                setProducts(mappedProducts);
                const filteredCats = cats.filter(c => {
                    const name = c.name.toLowerCase();
                    return name !== "hộp" && name !== "thiệp";
                });
                setCategories(filteredCats);
            } catch (error) {
                console.error("Failed to load products and categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const boxes: Box[] = products
        .filter(p => p.category.toLowerCase() === "hộp")
        .map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            capacity: 6, // default capacity
            image: p.imageUrl,
            desc: "Bao bì hộp quà tiêu chuẩn"
        }));

    const cards = useMemo(() => {
        return products
            .filter(p => p.category.toLowerCase() === "thiệp")
            .map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                image: p.imageUrl || p.image || ''
            }));
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(p => {
            const cat = p.category.toLowerCase();
            return cat !== "hộp" && cat !== "thiệp";
        }); // don't show boxes and cards in items list

        if (activeCategory !== "Tất cả") {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        }

        return result;
    }, [activeCategory, searchQuery, products]);

    // --- Computed Cart Logic ---
    const totalItemsQuantity = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
    const boxCapacity = selectedBox ? selectedBox.capacity : 0;
    const spaceUsedPercentage = boxCapacity > 0 ? Math.min((totalItemsQuantity / boxCapacity) * 100, 100) : 0;

    const selectedCard = cards.find(c => c.id === selectedCardId);
    const totalPrice = (selectedBox?.price || 0)
        + selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        + (selectedCard?.price || 0);

    // --- Actions ---
    const handleBoxSelect = (box: Box) => {
        setSelectedBox(box);
        if (totalItemsQuantity > box.capacity) {
            alert(`Cảnh báo: Hộp mới chỉ chứa được ${box.capacity} món, bạn hiện đang chọn ${totalItemsQuantity} món!`);
        }
        setCurrentStep(2);
    };

    const handleItemAdd = (product: any, e: React.MouseEvent) => {
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

    const handleItemRemove = (productId: string | number) => {
        setSelectedItems(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
            }
            return prev.filter(item => item.id !== productId);
        });
    };

    return (
        <div className="min-h-screen bg-boonie-bg p-4 md:p-8 flex justify-center font-sans text-boonie-text">
            <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-8 items-start relative pb-32 lg:pb-0">
                {/* Left Sidebar (Sticky on Desktop) */}
                <div className="w-full lg:w-[360px] flex flex-col gap-2 shrink-0 z-10 lg:sticky top-[115px] lg:h-[calc(100vh-115px)]">
                    <BuildABoxHeader
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        selectedBox={selectedBox}
                    />

                    <CartPreviewSidebar
                        selectedBox={selectedBox}
                        selectedItems={selectedItems}
                        selectedCard={selectedCard || null}
                        totalItemsQuantity={totalItemsQuantity}
                        boxCapacity={boxCapacity}
                        spaceUsedPercentage={spaceUsedPercentage}
                        currentStep={currentStep}
                        totalPrice={totalPrice}
                        handleItemRemove={handleItemRemove}
                        onChangeBox={() => setCurrentStep(1)}
                        onNext={() => {
                            if (currentStep === 1 && !selectedBox) {
                                alert("Vui lòng chọn vỏ hộp trước khi tiếp tục!");
                                return;
                            }
                            setCurrentStep(prev => prev + 1);
                        }}
                        onBack={() => setCurrentStep(2)}
                        onComplete={() => {
                            const handleComplete = () => {
                                navigate("/checkout", {
                                    state: {
                                        selectedBox,
                                        selectedItems,
                                        selectedCard,
                                        cardMessage,
                                        totalPrice
                                    }
                                });
                            };
                            handleComplete();
                        }}
                    />
                </div>



                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 1 && (
                        <Step1Packaging
                            boxes={boxes}
                            selectedBox={selectedBox}
                            handleBoxSelect={handleBoxSelect}
                            isLoading={isLoading}
                        />
                    )}

                    {currentStep === 2 && (
                        <Step2Items
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredAndSortedProducts={filteredAndSortedProducts}
                            handleItemAdd={handleItemAdd}
                            handleItemRemove={handleItemRemove}
                            selectedItems={selectedItems}
                            totalItemsQuantity={totalItemsQuantity}
                            boxCapacity={boxCapacity}
                            categories={categories}
                            isLoading={isLoading}
                        />
                    )}

                    {currentStep === 3 && (
                        <Step3Card
                            cards={cards}
                            selectedCardId={selectedCardId}
                            setSelectedCardId={setSelectedCardId}
                            cardMessage={cardMessage}
                            setCardMessage={setCardMessage}
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
}
