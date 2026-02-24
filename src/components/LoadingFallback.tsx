import { Loader2 } from "lucide-react";

export function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] w-full text-boonie-text font-fredoka">
            <Loader2 className="w-10 h-10 animate-spin text-[#FF6B98] mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Đang tải ứng dụng...</p>
        </div>
    );
}
