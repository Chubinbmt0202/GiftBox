import { Button } from "../components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white py-12 px-4 md:py-20 md:pb-28">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-12">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 text-center lg:text-left pt-8 lg:pt-0"
                        >
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-primary-900 leading-[1.1] mb-8">
                                Sáng tạo hộp quà theo cách riêng
                            </h1>
                            <p className="text-base md:text-lg text-primary-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                                Từ nến thơm, hoa khô đến những bức ảnh kỷ niệm — hàng trăm món đồ nhỏ xinh đang chờ bạn kết hợp thành một món quà hoàn hảo.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                <Link to="/build-a-box">
                                    <Button size="lg" className="w-full sm:w-auto font-medium text-base h-14 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
                                        Tự tạo hộp quà của bạn <ArrowUpRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/ready-to-ship" className="group flex items-center gap-2 text-primary-800 font-semibold hover:text-primary-900 transition-colors">
                                    Khám phá bộ sưu tập
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform">
                                        <path d="M9.5 6L0.5 11.1962L0.5 0.803847L9.5 6Z" fill="currentColor" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 w-full"
                        >
                            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-primary-100 relative">
                                <img
                                    src="https://i.pinimg.com/736x/b2/1b/18/b21b1836cdd14c8aab0f426534fc3cd0.jpg"
                                    alt="Hộp quà"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
