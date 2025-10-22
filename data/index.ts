import {
    CPU, Motherboard, RAM, GPU, Cooler, Storage,
    Case, PSU, Monitor, Keyboard, Mouse, SelectedParts
} from "@/types/parts";

import rawCpus from "./islemci.json";
import rawMotherboards from "./anakart.json";
import rawRams from "./ram.json";
import rawGpus from "./ekran_karti.json";
import rawCoolers from "./islemci_sogutucu.json";
import rawStorages from "./depolama.json";
import rawCases from "./kasa.json";
import rawPsus from "./psu.json";
import rawMonitors from "./monitor.json";
import rawKeyboards from "./klavye.json";
import rawMice from "./fare.json";

export const cpusData = rawCpus as CPU[];
export const motherboardsData = rawMotherboards as Motherboard[];
export const ramsData = rawRams as unknown as RAM[];
export const gpusData = rawGpus as unknown as GPU[];
export const coolersData = rawCoolers as Cooler[];
export const storagesData = rawStorages as Storage[];
export const casesData = rawCases as Case[];
export const psusData = rawPsus as unknown as PSU[];
export const monitorsData = rawMonitors as Monitor[];
export const keyboardsData = rawKeyboards as Keyboard[];
export const miceData = rawMice as Mouse[];


export function checkCompatibility(parts: SelectedParts) {
    const errors: string[] = [];
    const warnings: string[] = [];

    const { cpu, motherboard, ram, gpu, psu, case: pcCase, cooler } = parts;

    // 🔹 Anakart ↔ CPU
    if (cpu && motherboard) {
        if (cpu.soket !== motherboard.soket)
            errors.push("Anakart ve işlemci soketleri uyuşmuyor.");
        if (!motherboard.cpu_uyumluluk.nesiller.includes(cpu.nesil))
            warnings.push("İşlemci nesli anakart tarafından resmi olarak desteklenmeyebilir.");
        if (cpu.bellek_destek.tip !== motherboard.bellek.tip)
            errors.push("Anakart ve işlemci farklı RAM türlerini destekliyor.");
    }

    // 🔹 Anakart ↔ RAM
    if (ram && motherboard) {
        if (ram.tip !== motherboard.bellek.tip)
            errors.push("RAM tipi anakartla uyuşmuyor (DDR4 / DDR5 farkı).");
    }

    // 🔹 GPU ↔ Kasa
    if (gpu && pcCase) {
        if (gpu.boyut.uzunluk_mm > pcCase.gpu_uzunluk_max_mm)
            errors.push("Ekran kartı kasaya sığmıyor (uzunluk fazla).");
    }

    // 🔹 CPU Soğutucu ↔ Kasa
    if (cooler && pcCase) {
        if (cooler.tip === "Air" && cooler.yukseklik_mm && cooler.yukseklik_mm > pcCase.cpu_sogutucu_yukseklik_max_mm)
            errors.push("Hava soğutucu kasaya sığmıyor (yükseklik fazla).");
        if (cooler.tip === "Liquid" && cooler.radyator_mm) {
            const allSupported = [
                ...pcCase.radyator_destek.front,
                ...pcCase.radyator_destek.top,
                ...pcCase.radyator_destek.rear
            ];
            if (!allSupported.includes(cooler.radyator_mm))
                errors.push("Kasa bu radyatör boyutunu desteklemiyor.");
        }
    }

    // 🔹 Soğutucu ↔ CPU
    if (cooler && cpu) {
        if (!cooler.desteklenen_soketler.includes(cpu.soket))
            errors.push("Soğutucu bu işlemci soketini desteklemiyor.");
        if (cpu.tdp_w > cooler.max_tdp_w)
            warnings.push("İşlemcinin TDP değeri, soğutucunun maksimum kapasitesine yakın veya üzerinde.");
    }

    // 🔹 PSU ↔ GPU
    if (gpu && psu) {
        if (gpu.guc.onerilen_psu_w > psu.guc_w)
            warnings.push("PSU watt değeri ekran kartı için yetersiz olabilir.");
    }

    // 🔹 PSU ↔ Kasa
    if (psu && pcCase) {
        if (!pcCase.psu_destek.includes(psu.form_factor))
            errors.push("PSU form faktörü kasa ile uyumlu değil.");
    }

    return { errors, warnings };
}
