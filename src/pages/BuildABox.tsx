import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package, Sparkles, MailOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function BuildABox() {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, title: "Packaging", icon: Package },
        { id: 2, title: "Items", icon: Sparkles },
        { id: 3, title: "Card", icon: MailOpen },
    ];

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
                                    <div className={`flex items-center gap-2 ${isActive ? 'text-primary-900' : isPast ? 'text-primary-500' : 'text-primary-300'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-primary-900 bg-primary-50' : isPast ? 'border-primary-500 bg-white' : 'border-primary-200 bg-white'}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium hidden sm:block">{step.title}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 h-px mx-4 sm:w-20 ${isPast ? 'bg-primary-300' : 'bg-primary-100'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="font-medium text-primary-900">
                        $0.00
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Main Content Area (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-warm-gray">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="font-serif text-3xl font-bold text-primary-900 mb-2">
                                {currentStep === 1 && "Start with the perfect presentation"}
                                {currentStep === 2 && "Fill it with curations"}
                                {currentStep === 3 && "Add a personalized note"}
                            </h2>
                            <p className="text-primary-600 mb-8">
                                {currentStep === 1 && "Choose a box style that sets the tone for your gift."}
                                {currentStep === 2 && "Select from our premium assortment of artisan goods."}
                                {currentStep === 3 && "Write a heartfelt message to complete the experience."}
                            </p>

                            {/* Placeholder Content for Step 1 */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-white p-4 rounded-2xl border-2 border-transparent hover:border-primary-200 cursor-pointer shadow-sm transition-all">
                                            <div className="aspect-square bg-primary-50 rounded-xl mb-4"></div>
                                            <h3 className="font-bold text-primary-900">Classic Kraft Box</h3>
                                            <p className="text-sm text-primary-600 mb-2">Sustainable & minimalist</p>
                                            <p className="font-medium text-primary-900">$10</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Sidebar Space visualizer / Cart Preview (Fixed) */}
                <div className="w-full md:w-80 h-full overflow-y-auto bg-white border-l border-primary-100 p-6 flex flex-col shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-10 shrink-0">
                    <h3 className="font-serif font-bold text-xl text-primary-900 mb-6">Your Box</h3>

                    <div className="flex-1 border-2 border-dashed border-primary-200 rounded-2xl flex items-center justify-center p-6 bg-primary-50/50 mb-6">
                        <div className="text-center text-primary-400">
                            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="font-medium text-sm">Select a box to get started</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-primary-700">
                            <span>Box space used</span>
                            <span>0%</span>
                        </div>
                        <div className="w-full h-2 bg-primary-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 w-0"></div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-primary-100 flex gap-4">
                        {currentStep > 1 && (
                            <Button onClick={() => setCurrentStep(prev => prev - 1)} variant="outline" className="flex-1">
                                Back
                            </Button>
                        )}
                        <Button onClick={() => setCurrentStep(prev => prev < 3 ? prev + 1 : prev)} className="flex-1 shadow-md">
                            {currentStep === 3 ? "Complete" : "Next Step"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
