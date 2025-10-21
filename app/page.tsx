"use client";

import { useState, useMemo } from "react";
import Summary from "@/components/Summary";
import BottomNavBar from "@/components/BottomNavBar";
import PartList from "@/components/PartList";
import {
    CPU, Motherboard, RAM, GPU, Cooler, Storage,
    Case, PSU, Monitor, Keyboard, Mouse, BasePart
} from "@/types/parts";
import {
    Cpu, Server, MemoryStick, HardDrive,
    LayoutDashboard, Power, Tv,
    Keyboard as KeyboardIcon, Mouse as MouseIcon, Snowflake
} from "lucide-react";
import {
    cpusData, motherboardsData, ramsData, gpusData, coolersData,
    storagesData, casesData, psusData, monitorsData, keyboardsData, miceData
} from "@/data";

type CategoryKey =
    'cpu' | 'motherboard' | 'ram' | 'gpu' | 'cooler' |
    'storage' | 'case' | 'psu' | 'monitor' | 'keyboard' | 'mouse';

export default function BuilderPage() {
    const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey | null>(null);

    const [selectedCpu, setSelectedCpu] = useState<CPU | null>(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard | null>(null);
    const [selectedRam, setSelectedRam] = useState<RAM | null>(null);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [selectedGpu, setSelectedGpu] = useState<GPU | null>(null);
    const [selectedCooler, setSelectedCooler] = useState<Cooler | null>(null);
    const [selectedPsu, setSelectedPsu] = useState<PSU | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
    const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);
    const [selectedKeyboard, setSelectedKeyboard] = useState<Keyboard | null>(null);
    const [selectedMouse, setSelectedMouse] = useState<Mouse | null>(null);

    const handleSelect = (key: CategoryKey, part: BasePart) => {
        switch (key) {
            case 'cpu': setSelectedCpu(part as CPU); setSelectedMotherboard(null); setSelectedRam(null); break;
            case 'motherboard': setSelectedMotherboard(part as Motherboard); setSelectedRam(null); break;
            case 'ram': setSelectedRam(part as RAM); break;
            case 'case': setSelectedCase(part as Case); break;
            case 'gpu': setSelectedGpu(part as GPU); break;
            case 'cooler': setSelectedCooler(part as Cooler); break;
            case 'psu': setSelectedPsu(part as PSU); break;
            case 'storage': setSelectedStorage(part as Storage); break;
            case 'monitor': setSelectedMonitor(part as Monitor); break;
            case 'keyboard': setSelectedKeyboard(part as Keyboard); break;
            case 'mouse': setSelectedMouse(part as Mouse); break;
        }
        setActiveCategoryKey(null);
    };

    const categoryConfigurations = [
        { key: 'cpu', title: 'İşlemci', IconComponent: Cpu, options: cpusData, disabled: false },
        { key: 'motherboard', title: 'Anakart', IconComponent: Server, options: motherboardsData, disabled: !selectedCpu },
        { key: 'ram', title: 'RAM', IconComponent: MemoryStick, options: ramsData, disabled: !selectedMotherboard },
        { key: 'case', title: 'Kasa', IconComponent: LayoutDashboard, options: casesData, disabled: !selectedMotherboard },
        { key: 'gpu', title: 'Ekran Kartı', IconComponent: Tv, options: gpusData, disabled: !selectedCase },
        { key: 'cooler', title: 'Soğutucu', IconComponent: Snowflake, options: coolersData, disabled: !selectedCpu || !selectedCase },
        { key: 'psu', title: 'PSU', IconComponent: Power, options: psusData, disabled: !selectedCase || !selectedGpu },
        { key: 'storage', title: 'Depolama', IconComponent: HardDrive, options: storagesData, disabled: false },
        { key: 'monitor', title: 'Monitör', IconComponent: Tv, options: monitorsData, disabled: false },
        { key: 'keyboard', title: 'Klavye', IconComponent: KeyboardIcon, options: keyboardsData, disabled: false },
        { key: 'mouse', title: 'Fare', IconComponent: MouseIcon, options: miceData, disabled: false },
    ];

    const activeCategoryData = activeCategoryKey ? categoryConfigurations.find(c => c.key === activeCategoryKey) : null;

    const selectedParts = {
        cpu: selectedCpu, motherboard: selectedMotherboard, ram: selectedRam,
        case: selectedCase, gpu: selectedGpu, cooler: selectedCooler,
        psu: selectedPsu, storage: selectedStorage, monitor: selectedMonitor,
        keyboard: selectedKeyboard, mouse: selectedMouse
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-text-main tracking-wider">
                KENDİN TOPLA
            </h1>

            <div className="flex flex-col lg:flex-row lg:flex-nowrap gap-6 max-w-7xl mx-auto">
                {/* PartList alanı %70 */}
                <div className="w-full lg:w-[70%] min-w-0 flex flex-col">
                    {activeCategoryData && !activeCategoryData.disabled ? (
                        <div className="flex-1 min-h-[500px] max-h-[700px] overflow-y-auto">
                            <PartList
                                title={activeCategoryData.title}
                                options={activeCategoryData.options as BasePart[]}
                                onSelect={(part) => handleSelect(activeCategoryData.key as CategoryKey, part)}
                                onClose={() => setActiveCategoryKey(null)}
                            />
                        </div>
                    ) : (
                        <div className="bg-[#1f2833] rounded-xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center">
                            <h2 className="text-3xl font-bold mb-4 text-[#66fcf1]">Sistem Toplamaya Başla</h2>
                            <p className="text-gray-400">Parçaları seçmek için alt menüyü kullan.</p>
                        </div>
                    )}
                </div>

                {/* Summary alanı %30 */}
                <div className="w-full lg:w-[30%] min-w-0 flex flex-col">
                    <Summary selectedParts={selectedParts} />
                </div>
            </div>

            {/* Bottom NavBar */}
            <div className="mt-6 lg:mt-8">
                <BottomNavBar
                    categories={categoryConfigurations}
                    onCategorySelect={(key) => setActiveCategoryKey(key as CategoryKey)}
                    activeCategoryKey={activeCategoryKey}
                    selectedParts={selectedParts}
                    horizontalLayout
                />
            </div>
        </main>
    );
}
