"use client";

import { useState, useEffect } from "react";
import Summary from "@/components/Summary";
import BottomNavBar from "@/components/BottomNavBar";
import PartList from "@/components/PartList";
import {
    CPU, Motherboard, RAM, GPU, Cooler, Storage,
    Case, PSU, Monitor, Keyboard, Mouse, BasePart, SelectedParts
} from "@/types/parts";
import {
    Cpu, Server, MemoryStick, HardDrive,
    LayoutDashboard, Power, Tv,
    Keyboard as KeyboardIcon, Mouse as MouseIcon, Snowflake
} from "lucide-react";
import {
    cpusData, motherboardsData, ramsData, gpusData, coolersData,
    storagesData, casesData, psusData, monitorsData, keyboardsData, miceData,
    checkCompatibility
} from "@/data";

type CategoryKey =
    'motherboard' | 'cpu' | 'ram' | 'gpu' | 'psu' |
    'case' | 'storage' | 'monitor' | 'keyboard' | 'mouse' | 'cooler';

export default function BuilderPage() {
    const [activeCategoryKey, setActiveCategoryKey] = useState<CategoryKey | null>(null);

    const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard | null>(null);
    const [selectedCpu, setSelectedCpu] = useState<CPU | null>(null);
    const [selectedRam, setSelectedRam] = useState<RAM | null>(null);
    const [selectedGpu, setSelectedGpu] = useState<GPU | null>(null);
    const [selectedPsu, setSelectedPsu] = useState<PSU | null>(null);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
    const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);
    const [selectedKeyboard, setSelectedKeyboard] = useState<Keyboard | null>(null);
    const [selectedMouse, setSelectedMouse] = useState<Mouse | null>(null);
    const [selectedCooler, setSelectedCooler] = useState<Cooler | null>(null);

    const [compatibility, setCompatibility] = useState<{ errors: string[]; warnings: string[] }>({ errors: [], warnings: [] });

    // 🔹 Sayfa yüklendiğinde localStorage'dan yükle
    useEffect(() => {
        const savedData = localStorage.getItem("pc-builder");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            setSelectedMotherboard(parsed.motherboard || null);
            setSelectedCpu(parsed.cpu || null);
            setSelectedRam(parsed.ram || null);
            setSelectedGpu(parsed.gpu || null);
            setSelectedPsu(parsed.psu || null);
            setSelectedCase(parsed.case || null);
            setSelectedStorage(parsed.storage || null);
            setSelectedMonitor(parsed.monitor || null);
            setSelectedKeyboard(parsed.keyboard || null);
            setSelectedMouse(parsed.mouse || null);
            setSelectedCooler(parsed.cooler || null);
        }
    }, []);

    // 🔹 Her değişimde localStorage’a kaydet ve uyumluluğu kontrol et
    useEffect(() => {
        const dataToSave: SelectedParts = {
            motherboard: selectedMotherboard,
            cpu: selectedCpu,
            ram: selectedRam,
            gpu: selectedGpu,
            psu: selectedPsu,
            case: selectedCase,
            storage: selectedStorage,
            monitor: selectedMonitor,
            keyboard: selectedKeyboard,
            mouse: selectedMouse,
            cooler: selectedCooler,
        };
        localStorage.setItem("pc-builder", JSON.stringify(dataToSave));

        const result = checkCompatibility(dataToSave);
        setCompatibility(result);
    }, [
        selectedMotherboard, selectedCpu, selectedRam,
        selectedGpu, selectedPsu, selectedCase,
        selectedStorage, selectedMonitor,
        selectedKeyboard, selectedMouse, selectedCooler
    ]);

    const clearAll = () => {
        setSelectedMotherboard(null);
        setSelectedCpu(null);
        setSelectedRam(null);
        setSelectedGpu(null);
        setSelectedPsu(null);
        setSelectedCase(null);
        setSelectedStorage(null);
        setSelectedMonitor(null);
        setSelectedKeyboard(null);
        setSelectedMouse(null);
        setSelectedCooler(null);
        setActiveCategoryKey(null);
        localStorage.removeItem("pc-builder");
        setCompatibility({ errors: [], warnings: [] });
    };

    const handleSelect = (key: CategoryKey, part: BasePart) => {
        switch (key) {
            case 'motherboard':
                setSelectedMotherboard(part as Motherboard);
                setSelectedCpu(null);
                setSelectedRam(null);
                setSelectedGpu(null);
                setSelectedPsu(null);
                setSelectedCase(null);
                setSelectedStorage(null);
                setSelectedMonitor(null);
                setSelectedKeyboard(null);
                setSelectedMouse(null);
                setSelectedCooler(null);
                break;
            case 'cpu': setSelectedCpu(part as CPU); break;
            case 'ram': setSelectedRam(part as RAM); break;
            case 'gpu': setSelectedGpu(part as GPU); break;
            case 'psu': setSelectedPsu(part as PSU); break;
            case 'case': setSelectedCase(part as Case); break;
            case 'storage': setSelectedStorage(part as Storage); break;
            case 'monitor': setSelectedMonitor(part as Monitor); break;
            case 'keyboard': setSelectedKeyboard(part as Keyboard); break;
            case 'mouse': setSelectedMouse(part as Mouse); break;
            case 'cooler': setSelectedCooler(part as Cooler); break;
        }
        setActiveCategoryKey(null);
    };

    const categoryConfigurations = [
        { key: 'motherboard', title: 'Anakart', IconComponent: Server, options: motherboardsData, disabled: false },
        { key: 'cpu', title: 'İşlemci', IconComponent: Cpu, options: cpusData, disabled: !selectedMotherboard },
        { key: 'ram', title: 'RAM', IconComponent: MemoryStick, options: ramsData, disabled: !selectedCpu },
        { key: 'gpu', title: 'Ekran Kartı', IconComponent: Tv, options: gpusData, disabled: !selectedRam },
        { key: 'psu', title: 'Güç Kaynağı (PSU)', IconComponent: Power, options: psusData, disabled: !selectedGpu },
        { key: 'case', title: 'Kasa', IconComponent: LayoutDashboard, options: casesData, disabled: !selectedPsu },
        { key: 'storage', title: 'Depolama', IconComponent: HardDrive, options: storagesData, disabled: !selectedCase },
        { key: 'monitor', title: 'Monitör', IconComponent: Tv, options: monitorsData, disabled: !selectedStorage },
        { key: 'keyboard', title: 'Klavye', IconComponent: KeyboardIcon, options: keyboardsData, disabled: !selectedMonitor },
        { key: 'mouse', title: 'Fare', IconComponent: MouseIcon, options: miceData, disabled: !selectedKeyboard },
        { key: 'cooler', title: 'CPU Soğutucu', IconComponent: Snowflake, options: coolersData, disabled: !selectedMouse },
    ];

    const activeCategoryData = activeCategoryKey
        ? categoryConfigurations.find(c => c.key === activeCategoryKey)
        : null;

    const selectedParts: SelectedParts = {
        motherboard: selectedMotherboard, cpu: selectedCpu, ram: selectedRam,
        gpu: selectedGpu, psu: selectedPsu, case: selectedCase, storage: selectedStorage,
        monitor: selectedMonitor, keyboard: selectedKeyboard, mouse: selectedMouse, cooler: selectedCooler
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-text-main tracking-wider">
                KENDİN TOPLA
            </h1>

            <div className="flex flex-col lg:flex-row lg:flex-nowrap gap-6 max-w-7xl mx-auto">
                <div className="w-full lg:w-[70%] min-w-0">
                    {activeCategoryData && !activeCategoryData.disabled ? (
                        <PartList
                            title={activeCategoryData.title}
                            options={activeCategoryData.options as BasePart[]}
                            onSelect={(part) => handleSelect(activeCategoryData.key as CategoryKey, part)}
                            onClose={() => setActiveCategoryKey(null)}
                        />
                    ) : (
                        <div className="bg-[#1f2833] rounded-xl p-8 flex flex-col items-center justify-center min-h-[500px] text-center">
                            <h2 className="text-3xl font-bold mb-4 text-[#66fcf1]">Sistem Toplamaya Başla</h2>
                            <p className="text-gray-400">Parçaları seçmek için alt menüyü kullan.</p>
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-[30%] min-w-0">
                    <Summary selectedParts={selectedParts} onClearAll={clearAll} compatibility={compatibility} />
                </div>
            </div>

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
