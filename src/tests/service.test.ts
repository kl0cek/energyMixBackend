import { calculateDailyAverage } from '../services/service';
import { calculateCleanEnergyPercentage } from '../utils/utils'
import { GenerationMix, GenerationData } from '../types/types';

describe('Energy Mix Service', () => {
  describe('calculateCleanEnergyPercentage', () => {
    it('should calculate clean energy percentage correctly', () => {
      const generationmix: GenerationMix[] = [
        { fuel: 'biomass', perc: 5.5 },
        { fuel: 'coal', perc: 2.0 },
        { fuel: 'nuclear', perc: 20.0 },
        { fuel: 'wind', perc: 30.5 },
        { fuel: 'gas', perc: 42.0 }
      ];
      
      const result = calculateCleanEnergyPercentage(generationmix);
      expect(result).toBe(56);
    });

    it('should return 0 when no clean energy sources', () => {
      const generationmix: GenerationMix[] = [
        { fuel: 'coal', perc: 50.0 },
        { fuel: 'gas', perc: 50.0 }
      ];
      
      const result = calculateCleanEnergyPercentage(generationmix);
      expect(result).toBe(0);
    });
  });

  describe('calculateDailyAverage', () => {
    it('should calculate daily average correctly', () => {
      const intervals: GenerationData[] = [
        {
          from: '2025-01-01T00:00:00Z',
          to: '2025-01-01T00:30:00Z',
          generationmix: [
            { fuel: 'wind', perc: 30 },
            { fuel: 'gas', perc: 70 }
          ]
        },
        {
          from: '2025-01-01T00:30:00Z',
          to: '2025-01-01T01:00:00Z',
          generationmix: [
            { fuel: 'wind', perc: 40 },
            { fuel: 'gas', perc: 60 }
          ]
        }
      ];
      
      const result = calculateDailyAverage(intervals);
      
      expect(result).toContainEqual({ fuel: 'wind', perc: 35 });
      expect(result).toContainEqual({ fuel: 'gas', perc: 65 });
    });
  });
});
