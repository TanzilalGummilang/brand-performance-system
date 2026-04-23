import express from 'express';
import productRoutes from './routes/product.route';
import { appConfig } from './lib/constants';

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(appConfig.port, () => {
  console.log(`Server running on ${appConfig.url}`);
});