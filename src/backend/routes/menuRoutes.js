import express from 'express';
const router = express.Router();
import { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';

router.post('/', createMenuItem);
router.get('/', getMenuItems);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

export default router;
