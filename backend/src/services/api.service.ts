import axios from 'axios';
import { fsaUrl } from '../lib/constants';

export interface FsaProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
}

// Fetch products from FakeStoreApi
export async function fetchFsaProducts(): Promise<FsaProduct[]> {
  try {
    const response = await axios.get(`${fsaUrl}/products?limit=20`, {
      timeout: 5000
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Response data is not valid.');
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`FakeStoreApi Error: ${error.response?.status} - ${error.message}`);
    } else {
      console.error('Unexpected Error:', error.message);
    }
    
    throw new Error('Failed to fetch data from the FakeStoreApi.');
  }
};