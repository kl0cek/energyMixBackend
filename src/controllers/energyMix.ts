import { Request, Response } from 'express';
import { getThreeDaysEnergyMix, findOptimalChargingWindow } from '../services/service';

export const getEnergyMix = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await getThreeDaysEnergyMix();
    res.json(data);
  } catch (error) {
    console.error('Error fetching energy mix:', error);
    res.status(500).json({
      error: 'Failed to fetch energy mix data',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOptimalCharging = async (req: Request, res: Response): Promise<void> => {
  try {
    const duration = parseInt(req.query.duration as string);

    if (!duration || duration < 1 || duration > 6) {
      res.status(400).json({
        error: 'Invalid duration parameter. Must be between 1 and 6 hours.',
      });
      return;
    }

    const result = await findOptimalChargingWindow(duration);
    res.json(result);
  } catch (error) {
    console.error('Error finding optimal charging window:', error);
    res.status(500).json({
      error: 'Failed to calculate optimal charging window',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
