import type { Box } from "./data";
import { MOCK_BOXES } from "./data"

interface Props {
    selectedBox: Box | null;
    handleBoxSelect: (box: Box) => void;
}

export function Step1Packaging({ selectedBox, handleBoxSelect }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            {MOCK_BOXES.map(box => (
                <div
                    key={box.id}
                    onClick={() => handleBoxSelect(box)}
                    className={`bg-white p-3 lg:p-4 rounded-xl border-2 cursor-pointer shadow-sm transition-all group flex flex-col ${selectedBox?.id === box.id
                        ? 'border-boonie-pink'
                        : 'border-transparent hover:border-gray-200 hover:-translate-y-1'
                        }`}
                >
                    <div className="aspect-[4/3] bg-[#f4ede4] rounded-xl mb-3 lg:mb-4 overflow-hidden relative flex items-center justify-center">
                        <img src={box.image} alt={box.name} className="w-full h-full object-cover mix-blend-multiply" />
                        {selectedBox?.id === box.id && (
                            <div className="absolute inset-0 bg-white/20 flex flex-col items-center justify-center">
                                <span className="bg-boonie-pink text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">Đã chọn</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-1">
                        <div className="mb-3">
                            <div className="flex flex-col mb-1 gap-1">
                                <h3 className="font-bold text-gray-900 text-sm lg:text-base leading-tight font-fredoka">{box.name}</h3>
                                <span className="text-boonie-pink font-semibold text-sm lg:text-base">{box.price.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <p className="text-[11px] lg:text-xs text-gray-500 line-clamp-2">{box.desc}</p>
                        </div>
                        <div className="mt-auto">
                            <div className="text-[11px] lg:text-xs font-semibold text-gray-900 bg-gray-50 rounded-xl py-1.5 lg:py-2 flex items-center justify-center font-fredoka">
                                Sức chứa: {box.capacity} món
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
