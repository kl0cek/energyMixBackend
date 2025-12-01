import { Router } from 'express';
import { getEnergyMix, getOptimalCharging } from '../controllers/energyMix';
import { validateChargingDuration } from '../utils/validations';

const router = Router();

router.get('/energy-mix', getEnergyMix);
router.get('/optimal-charging', validateChargingDuration, getOptimalCharging);

export default router;
