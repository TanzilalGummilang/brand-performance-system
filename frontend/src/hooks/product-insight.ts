import { useMemo } from 'react';
import type { Product } from '../lib/api';

export const useProductInsights = (products: Product[]) => {
  return useMemo(() => {
    if (products.length === 0) {
      return { total: 0, avgPrice: 'Rp 0', topSource: '-', mostExpensive: '-' };
    }

    // 1. Total Product
    const total = products.length;

    // 2. Average Price
    const totalNumericPrice = products.reduce((acc, curr) => {
      const priceNumber = parseInt(curr.price.replace(/[^0-9]/g, ''), 10) || 0;
      return acc + priceNumber;
    }, 0);

    const avgPrice = totalNumericPrice / total;
    const formattedAvgPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(avgPrice);

    // 3. Top Source
    const sourceCounts = products.reduce((acc: any, curr) => {
      acc[curr.source] = (acc[curr.source] || 0) + 1;
      return acc;
    }, {});

    const topSource = Object.keys(sourceCounts).reduce((a, b) =>
      sourceCounts[a] > sourceCounts[b] ? a : b
    );

    // 4. Most Expensive Product
    const mostExpensiveProduct = [...products].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
      return priceB - priceA;
    })[0];

    return {
      total,
      avgPrice: formattedAvgPrice,
      topSource,
      mostExpensive: mostExpensiveProduct?.name || '-'
    };
  }, [products]);
};