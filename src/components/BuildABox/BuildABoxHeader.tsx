import { Check } from "lucide-react";
import type { Box } from "./data";

export const steps = [
    { id: 1, title: "1. Choose Box" },
    { id: 2, title: "2. Add Items" },
    { id: 3, title: "3. Add Note" },
];

interface Props {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    selectedBox: Box | null;
}

export function BuildABoxHeader({ currentStep, setCurrentStep, selectedBox }: Props) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100/50">
            <div className="flex items-center justify-between relative px-2">
                {/* Horizontal connecting line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gray-100 z-0"></div>
                <div
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-boonie-pink z-0 transition-all duration-300"
                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                ></div>

                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isPast = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 z-10 relative bg-white px-2">
                            <button
                                onClick={() => {
                                    if (isPast) {
                                        setCurrentStep(step.id);
                                    } else if (step.id === 2 && selectedBox) {
                                        setCurrentStep(step.id);
                                    } else if (step.id === 3 && selectedBox) {
                                        setCurrentStep(step.id);
                                    }
                                }}
                                className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center transition-colors shadow-sm
                                    ${(isActive || isPast) ? 'bg-boonie-pink text-white' : 'bg-gray-100 text-gray-400'}`}
                            >
                                {isPast ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="text-sm font-bold font-fredoka">{step.id}</span>}
                            </button>

                            <span className={`text-xs font-fredoka leading-none ${isActive || isPast ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'}`}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
