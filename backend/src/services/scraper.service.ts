import axios from 'axios';
import * as cheerio from 'cheerio';
import { convertToIdr } from '../lib/utils';
import { btsUrl } from '../lib/constants';

export interface BtsData {
  original_id: string;
  name: string;
  price: number;
  source: string;
}

// Scrape data from Books to Scrape
export async function scrapeBtsData(): Promise<BtsData[]> {
  try {
    const { data } = await axios.get(btsUrl, {
      timeout: 5000
    });
    const $ = cheerio.load(data);
    const books: BtsData[] = [];

    const productPods = $('.product_pod');

    if (productPods.length === 0) {
      console.warn("Warning: No products found. HTML structure might have changed.");
      return [];
    }

    productPods.each((_, element) => {
      const title = $(element).find('h3 a').attr('title') as string;
      const priceRaw = $(element).find('.price_color').text();

      if (!title || !priceRaw) return;

      const priceNum = parseFloat(priceRaw.replace('£', ''));
      const slug = title.toLowerCase().match(/[a-z0-9]+/g)?.join('-') as string;

      books.push({
        original_id: slug,
        name: title,
        price: convertToIdr(priceNum, 'GBP'),
        source: 'Web Scraping',
      });
    });

    return books;
  } catch (error: any) {
    console.error("Scraping failed:", error.message);
    return [];
  }
};