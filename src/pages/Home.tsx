import { ArrowRight, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-boonie-bg font-fredoka">
            {/* Hero Section */}
            <section className="relative overflow-hidden md:py-12 md:pb-28">
                <div className="max-w-[1300px] mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 xl:gap-16">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 text-center lg:text-left pt-8 lg:pt-0 max-w-2xl"
                        >
                            {/* "CREATE YOUR OWN MAGIC" Badge */}
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE8D6] mb-8 border border-[#FFD5A6]/30">
                                <span className="text-yellow-500 text-sm">✨</span>
                                <span className="text-[12px] font-bold tracking-widest text-[#8B6B57]">CREATE YOUR OWN MAGIC</span>
                            </div>

                            <h1 className="font-fredoka text-[64px] lg:text-[76px] xl:text-[84px] font-bold text-boonie-text leading-[1.05] mb-6 tracking-[-0.02em]">
                                Build the Perfect
                                <span className="block text-[#FF6B98] mt-2 relative w-fit mx-auto lg:mx-0">
                                    Gift Box
                                    <div className="absolute -bottom-1 left-0 w-[105%] h-5 bg-[#FFB5A7] opacity-50 -z-10 -rotate-2 origin-bottom-left rounded"></div>
                                </span>
                            </h1>

                            <p className="text-lg md:text-[20px] text-[#A6978C] mb-12 max-w-[460px] mx-auto lg:mx-0 leading-[1.6] font-medium px-4 lg:px-0">
                                Curate a bundle of joy with our custom box builder. Pick a box, fill it with goodies, and add a personal note. Simple, fun, and oh-so-cute!
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start mb-16">
                                <Link to="/build-a-box" className="w-full sm:w-auto">
                                    <button className="flex items-center justify-center gap-2 w-full font-fredoka font-bold text-lg h-14 px-8 rounded-full bg-[#FF6B98] text-white hover:bg-[#ff5688] transition-colors shadow-md hover:shadow-lg">
                                        Start Building <ArrowRight className="w-5 h-5 ml-1" strokeWidth={2.5} />
                                    </button>
                                </Link>
                                <Link to="/ready-to-ship" className="w-full sm:w-auto">
                                    <button className="flex items-center justify-center w-full font-fredoka font-bold text-lg h-14 px-8 rounded-full border-[3px] border-[#FF6B98] text-[#FF6B98] bg-white hover:bg-[#FF6B98]/5 transition-colors shadow-sm hover:shadow-md">
                                        Shop Ready-Made
                                    </button>
                                </Link>
                            </div>

                            {/* Avatars / Trusted By */}
                            <div className="flex items-center gap-6 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-black border-2 border-boonie-bg flex items-center justify-center overflow-hidden z-30">
                                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 transform translate-y-1"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-boonie-bg flex items-center justify-center overflow-hidden z-20">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-boonie-bg z-10 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gray-300"></div>
                                    </div>
                                </div>
                                <span className="text-[15px] font-bold text-[#A6978C]">Loved by 10k+ happy gifters!</span>
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex-1 w-full max-w-[550px] relative mt-12 lg:mt-0"
                        >
                            {/* Decorative background shape */}
                            <div className="absolute inset-0 bg-white rounded-[40px] rotate-[3deg] scale-[1.03] -z-10 shadow-sm"></div>

                            <div className="aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-md border-[6px] border-white z-10 bg-gray-900">
                                <img
                                    src="https://i.pinimg.com/736x/9b/11/8e/9b118e94728bd4c2bde9620ee34fb347.jpg"
                                    alt="Black gift box with ribbon"
                                    className="w-full h-full object-cover opacity-90"
                                    style={{ objectPosition: 'center 60%' }}
                                />
                            </div>

                            {/* Floating Free Shipping Badge */}
                            <div className="absolute -bottom-8 -left-4 md:-left-12 lg:-left-12 bg-white rounded-full py-3.5 px-6 flex items-center gap-4 shadow-xl z-20 w-max border-2 border-white/50">
                                <div className="w-12 h-12 bg-[#FFF4E6] rounded-full flex items-center justify-center text-[#FFB067]">
                                    <Truck className="w-6 h-6" strokeWidth={2.5} />
                                </div>
                                <div className="pr-2">
                                    <p className="text-[12px] font-bold text-gray-500 mb-0.5 uppercase tracking-wide">Free Shipping</p>
                                    <p className="text-[15px] font-bold text-boonie-text leading-none">On orders over $50</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
