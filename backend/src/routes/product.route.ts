import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

router.post('/sync', productController.syncApiProducts);
router.get('/', productController.getAllProducts);

export default router;