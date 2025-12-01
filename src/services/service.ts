import {
  DailyEnergyMix,
  GenerationMix,
  OptimalChargingWindow,
  GenerationData,
} from '../types/types';

import {
  getDatesForQuery,
  fetchGenerationData,
  formatDateForApi,
  groupByDate,
  calculateCleanEnergyPercentage,
} from '../utils/utils';

export const calculateDailyAverage = (intervals: GenerationData[]): GenerationMix[] => {
  const fuelTotals = new Map<string, number>();

  intervals.forEach((interval) => {
    interval.generationmix.forEach((source) => {
      const current = fuelTotals.get(source.fuel) || 0;
      fuelTotals.set(source.fuel, current + source.perc);
    });
  });

  const averages: GenerationMix[] = [];
  fuelTotals.forEach((total, fuel) => {
    averages.push({
      fuel,
      perc: Math.round((total / intervals.length) * 100) / 100,
    });
  });

  return averages;
};

export const getThreeDaysEnergyMix = async (): Promise<DailyEnergyMix[]> => {
  try {
    const { today, dayAfterTomorrow } = getDatesForQuery();

    const fromDate = formatDateForApi(today);
    const toDate = formatDateForApi(dayAfterTomorrow);

    const data = await fetchGenerationData(fromDate, toDate);
    const grouped = groupByDate(data);

    const result: DailyEnergyMix[] = [];

    const todayStr = formatDateForApi(today);
    const sortedDates = Array.from(grouped.keys())
      .sort()
      .filter(dateStr => dateStr >= todayStr);
    
    
    sortedDates.slice(0, 3).forEach((dateStr) => {
      const intervals = grouped.get(dateStr) || [];

      if (intervals.length > 0) {
        const averageMix = calculateDailyAverage(intervals);
        result.push({
          date: dateStr,
          generationmix: averageMix,
          cleanEnergyPercentage: calculateCleanEnergyPercentage(averageMix),
        });
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching energy mix:', error);
    throw new Error('Failed to fetch energy mix data');
  }
};

export const findOptimalChargingWindow = async (
  durationHours: number
): Promise<OptimalChargingWindow> => {
  const { today, dayAfterTomorrow } = getDatesForQuery();

  const fromDate = formatDateForApi(today);
  const toDate = formatDateForApi(dayAfterTomorrow);

  const data = await fetchGenerationData(fromDate, toDate);

  if (!data || data.length === 0) {
    throw new Error('No energy data available');
  }

  const intervalsNeeded = durationHours * 2;

  if (data.length < intervalsNeeded) {
    throw new Error(
      `Insufficient data: need ${intervalsNeeded} intervals (${durationHours}h), but only ${data.length} available`
    );
  }

  let maxCleanEnergy = -1;
  let optimalWindow: OptimalChargingWindow | null = null;

  for (let i = 0; i <= data.length - intervalsNeeded; i++) {
    const window = data.slice(i, i + intervalsNeeded);
    const averageMix = calculateDailyAverage(window);
    const cleanPercentage = calculateCleanEnergyPercentage(averageMix);

    if (cleanPercentage > maxCleanEnergy) {
      maxCleanEnergy = cleanPercentage;

      const startDateTime = new Date(window[0].from);
      const endDateTime = new Date(window[window.length - 1].to);

      optimalWindow = {
        startDate: startDateTime.toISOString().split('T')[0],
        startTime: startDateTime.toTimeString().slice(0, 5),
        endDate: endDateTime.toISOString().split('T')[0],
        endTime: endDateTime.toTimeString().slice(0, 5),
        cleanEnergyPercentage: cleanPercentage,
      };
    }
  }

  if (!optimalWindow) {
    throw new Error('Unable to find optimal charging window');
  }

  return optimalWindow;
};
