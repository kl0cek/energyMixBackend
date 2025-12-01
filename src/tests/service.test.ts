import { calculateDailyAverage } from '../services/service';
import { GenerationData } from '../types/types';

describe('calculateDailyAverage', () => {
  it('should calculate daily average correctly', () => {
    const intervals: GenerationData[] = [
      {
        from: '2025-01-01T00:00:00Z',
        to: '2025-01-01T00:30:00Z',
        generationmix: [
          { fuel: 'wind', perc: 30 },
          { fuel: 'gas', perc: 70 },
        ],
      },
      {
        from: '2025-01-01T00:30:00Z',
        to: '2025-01-01T01:00:00Z',
        generationmix: [
          { fuel: 'wind', perc: 40 },
          { fuel: 'gas', perc: 60 },
        ],
      },
    ];

    const result = calculateDailyAverage(intervals);

    expect(result).toContainEqual({ fuel: 'wind', perc: 35 });
    expect(result).toContainEqual({ fuel: 'gas', perc: 65 });
  });

  it('should handle single interval', () => {
    const intervals: GenerationData[] = [
      {
        from: '2025-01-01T00:00:00Z',
        to: '2025-01-01T00:30:00Z',
        generationmix: [{ fuel: 'wind', perc: 50 }],
      },
    ];

    const result = calculateDailyAverage(intervals);
    expect(result).toContainEqual({ fuel: 'wind', perc: 50 });
  });
});
