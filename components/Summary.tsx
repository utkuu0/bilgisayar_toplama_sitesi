import { SelectedParts } from "@/types/parts";
import { useMemo } from "react";
import { PackageCheck } from "lucide-react"; // npm install lucide-react

interface SummaryProps {
    selectedParts: SelectedParts;
    onClearAll?: () => void;
}

export default function Summary({ selectedParts, onClearAll }: SummaryProps) {
    const totalPrice = useMemo(() => {
        return Object.values(selectedParts).reduce((total, part) => {
            return total + (part?.fiyat_try || 0);
        }, 0);
    }, [selectedParts]);

    const isAnySelected = useMemo(() => {
        return Object.values(selectedParts).some(Boolean);
    }, [selectedParts]);

    return (
        <div className="sticky top-8 bg-surface p-6 rounded-xl shadow-lg">
            <div className="mb-4 pb-3 border-b border-gray-700/50 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-text-main">
                    <PackageCheck className="text-primary" />
                    Sistem Özeti
                </h2>
                {onClearAll && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        disabled={!isAnySelected}
                        className="text-xs sm:text-sm font-semibold bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-disabled={!isAnySelected}
                    >
                        Tümünü Temizle
                    </button>
                )}
            </div>
            <ul className="space-y-4 my-6">
                {Object.entries(selectedParts).map(([key, part]) =>
                    part ? (
                        <li key={key} className="flex justify-between items-start text-sm">
                            <span className="font-semibold capitalize text-text-secondary w-1/3">{key}:</span>
                            <span className="text-right text-text-main w-2/3">{part.ad}</span>
                        </li>
                    ) : null
                )}
            </ul>
            <div className="mt-6 pt-4 border-t-2 border-gray-700/50">
                <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-text-main">Toplam:</span>
                    <span className="text-accent">{totalPrice.toLocaleString()} TL</span>
                </div>
            </div>
        </div>
    )
}