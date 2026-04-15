import ProductCard from './ProductCard';

const ProductGrid = ({ products, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-[#FFFDF7] rounded-xl overflow-hidden border border-[#F5E6C8] h-[450px]">
            <div className="bg-[#F5E6C8]/50 h-64 w-full"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-[#F5E6C8] rounded w-1/3"></div>
              <div className="h-6 bg-[#F5E6C8] rounded w-3/4"></div>
              <div className="h-4 bg-[#F5E6C8] rounded w-full"></div>
              <div className="h-4 bg-[#F5E6C8] rounded w-5/6"></div>
              <div className="pt-4 flex justify-between">
                <div className="h-8 bg-[#F5E6C8] rounded w-1/3"></div>
                <div className="h-10 bg-[#F5E6C8] rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
        <p className="text-red-600 font-medium">Failed to load products. Please try again later.</p>
        <p className="text-sm text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-[#F5E6C8]/20 rounded-xl border border-[#F5E6C8]/50">
        <span className="text-4xl mb-4 block">😔</span>
        <h3 className="text-2xl font-heading font-medium text-[#0F3D2E] mb-2">No products found</h3>
        <p className="text-[#0F3D2E]/70 font-body">Try adjusting your category or search filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
