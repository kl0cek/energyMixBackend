export interface GenerationMix {
  fuel: string;
  perc: number;
}

export interface GenerationData {
  from: string;
  to: string;
  generationmix: GenerationMix[];
}

export interface ApiResponse {
  data: GenerationData[];
}

export interface DailyEnergyMix {
  date: string;
  generationmix: GenerationMix[];
  cleanEnergyPercentage: number;
}

export interface OptimalChargingWindow {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  cleanEnergyPercentage: number;
}

export const CLEAN_ENERGY_SOURCES = ['biomass', 'nuclear', 'hydro', 'wind', 'solar'] as const;
export type CleanFuel = (typeof CLEAN_ENERGY_SOURCES)[number];
