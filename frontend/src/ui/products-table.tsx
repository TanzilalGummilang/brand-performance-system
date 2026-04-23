import type { Product } from "../lib/api";
import { formatIdr } from "../lib/utils";

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-gray-900">Image</th>
            <th className="px-4 py-3 font-semibold text-gray-900">Product Name</th>
            <th className="px-4 py-3 font-semibold text-gray-900 text-center">Category</th>
            <th className="px-4 py-3 font-semibold text-gray-900">Price</th>
            <th className="px-4 py-3 font-semibold text-gray-900">Source</th>
            <th className="px-4 py-3 font-semibold text-gray-900 hidden md:table-cell">Created At</th>
            <th className="px-4 py-3 font-semibold text-gray-900 hidden md:table-cell">Updated At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <p>No products found.</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.original_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-700 font-mono">{formatIdr(Number(product.price))}</td>
                <td className="px-4 py-4 text-gray-500">{product.source}</td>
                <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{product.created_at}</td>
                <td className="px-4 py-4 text-gray-500 hidden md:table-cell">{product.updated_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}