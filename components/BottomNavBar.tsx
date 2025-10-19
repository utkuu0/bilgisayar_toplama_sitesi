import { ElementType } from "react";
import { CheckCircle2 } from "lucide-react";
import { SelectedParts } from "@/types/parts";

interface CategoryConfig {
    key: string;
    title: string;
    IconComponent: ElementType;
    disabled: boolean;
}

interface BottomNavBarProps {
    categories: CategoryConfig[];
    onCategorySelect: (key: string) => void;
    activeCategoryKey: string | null;
    selectedParts: SelectedParts;
    horizontalLayout?: boolean; // Yan yana mı yoksa mobil alt bar mı
}

export default function BottomNavBar({
                                         categories,
                                         onCategorySelect,
                                         activeCategoryKey,
                                         selectedParts,
                                         horizontalLayout = false
                                     }: BottomNavBarProps) {

    const wrapperClass = horizontalLayout
        ? "bg-gradient-to-br from-green-50 to-white shadow-md rounded-xl p-3 w-full max-h-[600px] overflow-y-auto"
        : "fixed bottom-0 left-0 right-0 bg-surface shadow-lg z-40 lg:static lg:w-full lg:rounded-xl lg:shadow-md";

    const innerClass = horizontalLayout
        ? "flex flex-wrap justify-center gap-2"
        : "container mx-auto px-2 overflow-x-auto";

    const buttonContainerClass = horizontalLayout
        ? "flex flex-wrap justify-center gap-2"
        : "flex flex-nowrap justify-start md:justify-center items-center space-x-1 py-1";

    return (
        <div className={wrapperClass}>
            <div className={innerClass}>
                <div className={buttonContainerClass}>
                    {categories.map((cat) => {
                        const isSelected = !!selectedParts[cat.key as keyof SelectedParts];
                        const isActive = activeCategoryKey === cat.key;

                        return (
                            <button
                                key={cat.key}
                                onClick={() => {
                                    if (!cat.disabled) onCategorySelect(cat.key);
                                }}
                                disabled={cat.disabled}
                                className={`relative flex flex-col items-center justify-center p-3 text-center transition-colors duration-200 rounded-lg flex-shrink-0
                                    ${isActive ? "bg-green-500 text-white" : "hover:bg-green-100 text-text-secondary"}
                                    ${cat.disabled ? "opacity-40 cursor-not-allowed" : ""}
                                `}
                                style={{
                                    minWidth: horizontalLayout ? "90px" : "80px",
                                }}
                            >
                                {isSelected && (
                                    <CheckCircle2
                                        size={16}
                                        className="absolute top-1 right-1 text-green-400 bg-surface rounded-full"
                                    />
                                )}
                                <cat.IconComponent size={24} />
                                <span className="text-xs font-medium mt-1 whitespace-nowrap">
                                    {cat.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
