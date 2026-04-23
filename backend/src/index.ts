import express from 'express';
import productRoutes from './routes/product.route';
import { appConfig, corsOrigin } from './lib/constants';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(appConfig.port, () => {
  console.log(`Server running on ${appConfig.url}`);
});