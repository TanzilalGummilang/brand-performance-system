import prismaClient from '../lib/prisma';
import { convertToIdr } from '../lib/utils';
import { fetchFsaProducts, type FsaProduct } from './api.service';
import { scrapeBtsData, type BtsData } from './scraper.service';

interface Product {
  original_id: string;
  name: string;
  price: number;
  source: string;
}

async function saveToDb(products: Product[]) {
  return await prismaClient.$transaction(
    products.map((p) =>
      prismaClient.product.upsert({
        where: { original_id: p.original_id },
        update: { name: p.name, price: p.price },
        create: p,
      })
    )
  );
}

export async function syncProducts() {
  try {
    const [fsaProductRaw, btsDataRaw] = await Promise.all([
      fetchFsaProducts(),
      scrapeBtsData()
    ]);

    const fsaProductSanitized = fsaProductRaw.map((p: FsaProduct) => ({
      original_id: `fsa-${p.id}`,
      name: p.title,
      price: convertToIdr(p.price, 'USD'),
      source: 'Public API',
    }));

    const btsDataSanitized = btsDataRaw.map((b: BtsData) => ({
      original_id: `bts-${b.original_id}`,
      name: b.name,
      price: b.price,
      source: 'Web Scraping',
    }));

    const allData = [...fsaProductSanitized, ...btsDataSanitized];
    return await saveToDb(allData);

  } catch (error) {
    console.error("Error to sync products:", error);
    throw error;
  }
};