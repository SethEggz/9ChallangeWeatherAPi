import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

export default router;
