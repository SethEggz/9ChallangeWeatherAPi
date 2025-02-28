import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes);
router.use('/api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}', htmlRoutes);

export default router;
