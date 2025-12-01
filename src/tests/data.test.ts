import { groupByDate, formatDateForApi, getDatesForQuery } from '../utils/utils';
import { GenerationData } from '../types/types';

describe('Date Utilities', () => {
  describe('groupByDate', () => {
    it('should group intervals by date', () => {
      const data: GenerationData[] = [
        {
          from: '2025-01-01T00:00:00Z',
          to: '2025-01-01T00:30:00Z',
          generationmix: [],
        },
        {
          from: '2025-01-01T00:30:00Z',
          to: '2025-01-01T01:00:00Z',
          generationmix: [],
        },
        {
          from: '2025-01-02T00:00:00Z',
          to: '2025-01-02T00:30:00Z',
          generationmix: [],
        },
      ];

      const result = groupByDate(data);

      expect(result.size).toBe(2);
      expect(result.get('2025-01-01')).toHaveLength(2);
      expect(result.get('2025-01-02')).toHaveLength(1);
    });
  });

  describe('formatDateForApi', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-15T12:30:00Z');
      const result = formatDateForApi(date);
      expect(result).toBe('2025-01-15');
    });
  });

  describe('getDatesForQuery', () => {
    it('should return today, tomorrow, and day after tomorrow', () => {
      const result = getDatesForQuery();

      expect(result.today).toBeInstanceOf(Date);
      expect(result.tomorrow).toBeInstanceOf(Date);
      expect(result.dayAfterTomorrow).toBeInstanceOf(Date);

      const todayTime = result.today.getTime();
      const tomorrowTime = result.tomorrow.getTime();
      const dayAfterTime = result.dayAfterTomorrow.getTime();

      expect(tomorrowTime - todayTime).toBe(24 * 60 * 60 * 1000);
      expect(dayAfterTime - todayTime).toBe(2 * 24 * 60 * 60 * 1000);
    });
  });
});
