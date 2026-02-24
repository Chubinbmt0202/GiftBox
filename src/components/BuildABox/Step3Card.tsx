import type { Card } from "./data";
interface Props {
    cards: Card[];
    selectedCardId: string | number | null;
    setSelectedCardId: (id: string | number | null) => void;
    cardMessage: string;
    setCardMessage: (msg: string) => void;
}

export function Step3Card({ cards, selectedCardId, setSelectedCardId, cardMessage, setCardMessage }: Props) {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Card Selection */}
            <div className="flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {cards.map(card => (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCardId(card.id)}
                            className={`bg-white p-4 rounded-3xl border-2 cursor-pointer transition-all shadow-sm flex flex-col ${selectedCardId === card.id
                                ? 'border-boonie-pink'
                                : 'border-transparent hover:border-gray-200'
                                }`}
                        >
                            <div className="aspect-[4/3] bg-[#f4ede4] rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                                <img src={card.image} alt={card.name} className="w-full h-full object-cover mix-blend-multiply" />
                                {selectedCardId === card.id && (
                                    <div className="absolute inset-0 bg-white/20 flex flex-col items-center justify-center">
                                        <span className="bg-boonie-pink text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">Đã chọn</span>
                                    </div>
                                )}
                            </div>
                            <div className="px-1 text-center mt-auto">
                                <h4 className="font-bold text-gray-900 text-sm font-fredoka mb-1 line-clamp-1">{card.name}</h4>
                                <p className="font-semibold text-boonie-pink text-sm">{card.price.toLocaleString('vi-VN')} đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Area */}
            <div className="w-full lg:w-96 flex flex-col shrink-0">
                <div className="bg-white p-6 rounded-xl border border-transparent shadow-sm flex-1 flex flex-col">
                    <h3 className="font-fredoka font-bold text-xl text-gray-900 mb-2">Viết lời nhắn</h3>
                    <p className="text-sm text-gray-500 mb-4 font-sans">
                        Chúng tôi sẽ viết tay lời nhắn của bạn lên thiệp.
                    </p>
                    <textarea
                        className="w-full flex-1 min-h-[200px] p-4 bg-gray-50 border border-gray-100 rounded-xl resize-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-boonie-pink/50 transition-all font-sans text-sm"
                        placeholder="Nhập lời yêu thương của bạn tại đây..."
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                    ></textarea>
                    <div className="mt-4 text-right pr-2">
                        <span className={`text-xs font-medium ${cardMessage.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
                            {cardMessage.length} / 200
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
