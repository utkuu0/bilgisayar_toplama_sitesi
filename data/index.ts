import {
    CPU, Motherboard, RAM, GPU, Cooler, Storage,
    Case, PSU, Monitor, Keyboard, Mouse
} from "@/types/parts";

// Ham JSON verilerini import et
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

// Verileri dışa aktarırken TypeScript'e tiplerinin ne olduğunu 'as' ile bildir (Type Assertion)
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