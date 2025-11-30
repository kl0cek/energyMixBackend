import express, { Router } from 'express';
import cors from 'cors';
import { getEnergyMix, getOptimalCharging } from './controllers/energyMix';

const app = express();
app.use(cors());

export const router = Router();

app.use('/api', router);

router.get('/energy-mix', getEnergyMix);
router.get('/optimal-charging', getOptimalCharging);

export default app;
