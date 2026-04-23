import { useEffect, useState } from 'react';
import './App.css'
import { getProducts, type Product } from './lib/api';
import ProductTable from './ui/products-table';
import StatsCard from './ui/stats-card';
import { useProductInsights } from './hooks/product-insight';
import SyncProductsButton from './ui/sync-products-button';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { total, avgPrice, topSource, mostExpensive } = useProductInsights(products);

  const loadData = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="screen-center"><p>Loading...</p></div>;

  return (
    <div className="App container py-10">
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl mb-6">Brand Performance System</h1>
      
      {/* Sync Products Button */}
      <div className="flex mb-4">
        <SyncProductsButton onSuccess={loadData} />
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Inventory" value={total} sub="Items" color="blue" />
        <StatsCard title="Average Price" value={avgPrice} sub="Per Item" color="green" />
        <StatsCard title="Primary Source" value={topSource} sub="Highest Volume" color="purple" />
        <StatsCard title="Top Product" value={mostExpensive} sub="Highest Value" color="orange" />
      </div>

      {/* Product Table */}
      <ProductTable products={products} />
    </div>
  )
}
