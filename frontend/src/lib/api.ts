import axios from 'axios';
import { apiBaseurl } from './constants';

export interface ProductResponse {
  status: string;
  message: string;
  data?: Product[];
}

export interface Product {
  id: number;
  original_id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  source: 'Public API' | 'Web Scraping';
  created_at: string;
  updated_at: string;
}

export interface SyncProductsResponse {
  status: string;
  message: string;
}

export async function getProducts(): Promise<ProductResponse> {
  const response = await axios.get<ProductResponse>(`${apiBaseurl}/api/products`);
  return response.data;
}

export async function syncProducts(): Promise<SyncProductsResponse> {
  const response = await axios.post(`${apiBaseurl}/api/products/sync`);
  return response.data;
}