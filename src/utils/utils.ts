import axios from 'axios';

import {
  GenerationMix,
  GenerationData,
  CLEAN_ENERGY_SOURCES,
  ApiResponse,
  CleanFuel,
} from '../types/types';

const getApiUrl = (): string => {
  const url = process.env.API_BASE_URL;
  if (!url) {
    throw new Error('API_BASE_URL is not configured');
  }
  return url;
};

export const getDatesForQuery = (): { today: Date; tomorrow: Date; dayAfterTomorrow: Date } => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

  return { today, tomorrow, dayAfterTomorrow };
};

export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const fetchGenerationData = async (from: string, to: string): Promise<GenerationData[]> => {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    throw new Error('API_BASE_URL is not configured');
  }

  const response = await axios.get<ApiResponse>(`${apiUrl}/${from}/${to}`);
  if (!response.data?.data) {
    throw new Error('Invalid API response');
  }
  return response.data.data;
};

export const calculateCleanEnergyPercentage = (generationmix: GenerationMix[]): number => {
  const cleanEnergy = generationmix
    .filter((source) => CLEAN_ENERGY_SOURCES.includes(source.fuel as CleanFuel))
    .reduce((sum, source) => sum + source.perc, 0);

  return Math.round(cleanEnergy * 100) / 100;
};

export const groupByDate = (data: GenerationData[]): Map<string, GenerationData[]> => {
  const grouped = new Map<string, GenerationData[]>();

  data.forEach((interval) => {
    const date = interval.from.split('T')[0];
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(interval);
  });

  return grouped;
};
