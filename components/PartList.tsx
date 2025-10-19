"use client";

import { BasePart } from "@/types/parts";
import { useState, useMemo } from "react";
import { ArrowLeft } from 'lucide-react';

interface PartListProps<T extends BasePart> {
    title: string;
    options: T[];
    onSelect: (part: T) => void;
    onClose: () => void;
    maxHeight?: string;
}

export default function PartList<T extends BasePart>({ title, options, onSelect, onClose, maxHeight = "540px" }: PartListProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter(option => option.ad.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [options, searchTerm]);

    return (
        <div className="bg-[#1f2833] rounded-xl shadow-lg flex flex-col" style={{ maxHeight }}>
            <div className="flex items-center p-4 border-b border-gray-700/50">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors mr-4">
                    <ArrowLeft size={24} className="text-gray-300" />
                </button>
                <h2 className="text-2xl font-bold text-[#66fcf1]">{title} Seç</h2>
            </div>

            <div className="p-4 border-b border-gray-700/50">
                <input
                    type="text"
                    placeholder="Parça adı ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 bg-[#0b0c10] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#45a29e] text-white"
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredOptions.length > 0 ? filteredOptions.map(part => (
                    <div
                        key={part.id}
                        onClick={() => { if (part.stok.durum !== 'out_of_stock') onSelect(part); }}
                        className={`flex justify-between items-center p-4 bg-[#0b0c10] rounded-lg transition-all ${part.stok.durum === 'out_of_stock' ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:ring-2 hover:ring-[#45a29e]'}`}
                    >
                        <div>
                            <h4 className="font-semibold text-white">{part.ad}</h4>
                            {part.stok.durum === 'out_of_stock' && <p className="text-red-500 font-semibold text-sm">Stokta Yok</p>}
                        </div>
                        <p className="text-lg font-bold text-[#45a29e]">{part.fiyat_try.toLocaleString()} TL</p>
                    </div>
                )) : (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-lg">Uygun parça bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
