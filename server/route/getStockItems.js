import express from 'express';
import { fetchStockItems, fetchImage } from '../controller';

let router = express.Router();

router.get('/', fetchStockItems);
router.get('/:id', fetchImage);

export default router;