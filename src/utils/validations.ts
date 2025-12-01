import { Request, Response, NextFunction } from 'express';

export const validateChargingDuration = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const duration = req.query.duration;

  if (!duration) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Duration parameter is required',
      field: 'duration'
    });
    return;
  }

  const durationNum = Number(duration);

  if (isNaN(durationNum)) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Duration must be a valid number',
      field: 'duration',
      received: duration
    });
    return;
  }

  if (!Number.isInteger(durationNum)) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Duration must be a whole number (integer)',
      field: 'duration',
      received: duration
    });
    return;
  }

  if (durationNum < 1 || durationNum > 6) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Duration must be between 1 and 6 hours',
      field: 'duration',
      received: durationNum,
      allowedRange: { min: 1, max: 6 }
    });
    return;
  }

  next();
};