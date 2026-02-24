import { Trash2, Package } from "lucide-react";
import type { Box, SelectedProduct, Card } from "./data";

interface Props {
    selectedBox: Box | null;
    selectedItems: SelectedProduct[];
    selectedCard: Card | null;
    totalItemsQuantity: number;
    boxCapacity: number;
    spaceUsedPercentage: number;
    currentStep: number;
    totalPrice: number;
    handleItemRemove: (id: number) => void;
    onChangeBox: () => void;
    onNext: () => void;
    onBack?: () => void;
    onComplete: () => void;
}

export function CartPreviewSidebar({
    selectedBox,
    selectedItems,
    selectedCard,
    totalItemsQuantity,
    boxCapacity,
    spaceUsedPercentage,
    currentStep,
    totalPrice,
    handleItemRemove,
    onChangeBox,
    onNext,
    onBack,
    onComplete
}: Props) {
    const itemsNeeded = Math.max(0, boxCapacity - totalItemsQuantity);

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100/50 flex flex-col gap-5 flex-1 min-h-0">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 shrink-0">
                <h2 className="font-bold text-lg text-gray-900 font-fredoka flex items-center gap-2">
                    <Package className="w-5 h-5 text-boonie-pink" />
                    Hộp Quà Của Bạn
                </h2>
                <div className="text-right">
                    <p className="text-xs text-gray-500 font-sans">Sức chứa</p>
                    <p className="font-bold text-gray-900 font-fredoka text-sm">{totalItemsQuantity}/{boxCapacity}</p>
                </div>
            </div>

            {/* Capacity Bar */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shrink-0">
                <div
                    className="h-full bg-boonie-pink transition-all duration-500 rounded-full"
                    style={{ width: `${spaceUsedPercentage}%` }}
                ></div>
            </div>

            {!selectedBox && totalItemsQuantity === 0 && !selectedCard && (
                <div className="text-center py-6 text-gray-400 shrink-0">
                    <p className="text-sm font-fredoka">Hộp quà đang trống</p>
                    <p className="text-xs mt-1">Hãy bắt đầu bằng việc chọn một hộp quà</p>
                </div>
            )}

            <div className="flex flex-col gap-3 pr-2 flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                {selectedBox && (
                    <div className="flex gap-3 items-center group relative p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-[#f4ede4] rounded-xl overflow-hidden flex-shrink-0">
                            <img src={selectedBox.image} alt={selectedBox.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate font-fredoka">{selectedBox.name}</p>
                            <p className="text-xs text-gray-500">Bao bì hộp</p>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-start justify-end gap-2 w-28">
                            <div className="flex flex-col items-end gap-1">
                                <p className="font-semibold text-gray-900 text-sm font-sans">{selectedBox.price.toLocaleString('vi-VN')} đ</p>
                                {currentStep > 1 && (
                                    <button onClick={onChangeBox} className="text-[10px] font-bold text-boonie-pink hover:underline">Thay đổi</button>
                                )}
                            </div>
                            <div className="w-6 h-6 shrink-0" />
                        </div>
                    </div>
                )}

                {selectedItems.map(item => (
                    <div key={item.id} className="flex gap-3 items-center group relative p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-[#f4ede4] rounded-xl flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply rounded-xl" />
                            <div className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white z-10">
                                {item.quantity}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate font-fredoka line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.price.toLocaleString('vi-VN')} đ / món</p>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-center justify-end gap-2 w-28">
                            <p className="font-semibold text-gray-900 text-sm font-sans">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</p>
                            <button
                                onClick={() => handleItemRemove(item.id)}
                                className="w-6 h-6 shrink-0 rounded-md bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}

                {selectedCard && (
                    <div className="flex gap-3 items-center group relative p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-[#f4ede4] rounded-xl overflow-hidden flex-shrink-0">
                            <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate font-fredoka">{selectedCard.name}</p>
                            <p className="text-xs text-gray-500">Thiệp chúc mừng</p>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-center justify-end gap-2 w-28">
                            <p className="font-semibold text-gray-900 text-sm font-sans">{selectedCard.price.toLocaleString('vi-VN')} đ</p>
                            <div className="w-6 h-6 shrink-0" />
                        </div>
                    </div>
                )}
            </div>

            {itemsNeeded > 0 && selectedBox && currentStep === 2 && (
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl text-xs font-medium text-center border border-blue-100">
                    Thêm {itemsNeeded} món đồ nữa để làm đầy hộp nhé!
                </div>
            )}

            <div className="border-t border-gray-100 pt-3 mt-1 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-sm font-fredoka">Tạm tính</span>
                    <span className="text-xl font-bold text-gray-900 font-sans">{totalPrice.toLocaleString('vi-VN')} đ</span>
                </div>

                {currentStep < 3 ? (
                    <button
                        onClick={onNext}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${(currentStep === 1 && !selectedBox) ||
                            (currentStep === 2 && totalItemsQuantity === 0)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-boonie-pink text-white hover:bg-pink-500 hover:shadow-md hover:-translate-y-0.5'
                            }`}
                        disabled={(currentStep === 1 && !selectedBox) || (currentStep === 2 && totalItemsQuantity === 0)}
                    >
                        {currentStep === 1 ? 'Tiếp theo: Chọn Quà' : 'Tiếp theo: Lời Nhắn'}
                    </button>
                ) : (
                    <div className="flex flex-row gap-2">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="px-4 py-3 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors shrink-0"
                            >
                                Quay lại
                            </button>
                        )}
                        <button
                            onClick={onComplete}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${!selectedCard
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-900 text-white hover:bg-black hover:shadow-md hover:-translate-y-0.5'
                                }`}
                            disabled={!selectedCard}
                        >
                            Hoàn tất
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
