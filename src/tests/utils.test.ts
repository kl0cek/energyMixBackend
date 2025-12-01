import { calculateCleanEnergyPercentage } from '../utils/utils';
import { GenerationMix } from '../types/types';

describe('calculateCleanEnergyPercentage', () => {
  it('should calculate clean energy percentage correctly', () => {
    const generationmix: GenerationMix[] = [
      { fuel: 'biomass', perc: 5.5 },
      { fuel: 'coal', perc: 2.0 },
      { fuel: 'nuclear', perc: 20.0 },
      { fuel: 'wind', perc: 30.5 },
      { fuel: 'gas', perc: 42.0 },
    ];

    const result = calculateCleanEnergyPercentage(generationmix);
    expect(result).toBe(56);
  });

  it('should return 0 when no clean energy sources', () => {
    const generationmix: GenerationMix[] = [
      { fuel: 'coal', perc: 50.0 },
      { fuel: 'gas', perc: 50.0 },
    ];

    const result = calculateCleanEnergyPercentage(generationmix);
    expect(result).toBe(0);
  });

  it('should return 100 when only clean energy sources', () => {
    const generationmix: GenerationMix[] = [
      { fuel: 'wind', perc: 50.0 },
      { fuel: 'solar', perc: 30.0 },
      { fuel: 'hydro', perc: 20.0 },
    ];

    const result = calculateCleanEnergyPercentage(generationmix);
    expect(result).toBe(100);
  });

  it('should handle empty array', () => {
    const result = calculateCleanEnergyPercentage([]);
    expect(result).toBe(0);
  });

  it('should round to 2 decimal places', () => {
    const generationmix: GenerationMix[] = [
      { fuel: 'wind', perc: 33.333 },
      { fuel: 'gas', perc: 66.667 },
    ];

    const result = calculateCleanEnergyPercentage(generationmix);
    expect(result).toBe(33.33);
  });
});
