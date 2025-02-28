import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();



// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);

    // Save city to search history
    await HistoryService.addCity(city);

    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City deleted from search history' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting city from search history' });
  }
});

export default router;
