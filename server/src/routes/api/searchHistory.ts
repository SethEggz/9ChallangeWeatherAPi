import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';


const router = Router();

// GET search history
router.get('/', async (_req: Request, res: Response) => {
    try {
      const history = await HistoryService.getCities();
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving search history' });
    }
  });
  
  // DELETE city from search history
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await HistoryService.removeCity(id);
      res.status(200).json({ message: 'City deleted from search history' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting city from search history' });
    }
  });
export default router;
