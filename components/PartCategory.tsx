import { BasePart } from "@/types/parts"
import {ElementType} from "react"

interface PartCategoryProps {
    IconComponent: ElementType
    title: string
    selectedPart: BasePart | null
    onSelectClick: () => void
    disabled?: boolean
}

export default function PartCategory({ IconComponent, title, selectedPart, onSelectClick, disabled = false }: PartCategoryProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
                <IconComponent className={`h-8 w-8 transition-colors ${disabled ? 'text-text-secondary/30' : 'text-primary'}`} />
                <div>
                    <h3 className={`text-lg font-bold ${disabled ? 'text-text-main/50' : 'text-text-main'}`}>{title}</h3>
                    {selectedPart ? (
                        <p className="text-sm text-accent font-medium">{selectedPart.ad}</p>
                    ) : (
                        <p className="text-sm text-text-secondary">Seçim yapılmadı</p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-4">
                {selectedPart && (
                    <p className="hidden sm:block text-lg font-semibold text-text-main">{selectedPart.fiyat_try.toLocaleString()} TL</p>
                )}
                <button
                    onClick={onSelectClick}
                    disabled={disabled}
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors disabled:bg-gray-700 disabled:text-text-secondary disabled:cursor-not-allowed"
                >
                    {selectedPart ? 'Değiştir' : 'Seç'}
                </button>
            </div>
        </div>
    );
}