import type { Request, Response } from 'express';
import { syncProducts } from '../services/sync.service';
import prismaClient from '../lib/prisma';

export async function syncApiProducts(req: Request, res: Response) {
  try {
    const data = await syncProducts();

    return res.status(200).json({
      status: 'success',
      message: 'Successfully synced products.'
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to sync products.'
    });
  }
};

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await prismaClient.product.findMany();

    if (products.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No products found.'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched products.',
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products.'
    });
  }
};