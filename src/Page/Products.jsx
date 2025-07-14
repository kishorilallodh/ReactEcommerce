import React, { useContext, useState } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Get search query from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';

  // Filter products if search is active
  const filteredProducts = searchTerm
    ? products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="p-7 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        {searchTerm ? `Search results for "${searchTerm}"` : ''}
      </h1>

      {visibleProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {visibleProducts.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)] bg-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden flex flex-col"
            >
              <div className="relative flex-1 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[180px] w-auto object-contain"
                />
                {product.rating.rate > 4.5 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition">
                  {product.title}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
