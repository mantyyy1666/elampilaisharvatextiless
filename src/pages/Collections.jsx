import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import { Search } from 'lucide-react';

const placeholderProducts = [
  {
    id: '1',
    name: 'Pachai Kilimooku Soft Silk Saree',
    category: 'Elampillai Soft Silk',
    price: '2499',
    badge: 'Bestseller',
    description: 'Authentic Elampillai soft silk saree in parrot green with rich zari borders.',
    emoji: '🥻',
    specs: JSON.stringify({ "Fabric": "Soft Silk", "Zari": "Gold", "Wash": "Dry Clean" })
  },
  {
    id: '2',
    name: 'Midnight Blue Arani Silk',
    category: 'Arani Silk',
    price: '3999',
    badge: 'Premium',
    description: 'Deep midnight blue pure Arani silk with contrast pink borders. Perfect for weddings.',
    emoji: '✨',
    specs: JSON.stringify({ "Length": "6.2m with blouse", "Occasion": "Festive" })
  },
  {
    id: '3',
    name: 'Summer Yellow Kalyani Cotton',
    category: 'Kalyani Cotton',
    price: '1299',
    badge: 'New',
    description: 'Lightweight and breathable Kalyani cotton saree for comfortable daily wear.',
    emoji: '🌼',
    specs: JSON.stringify({ "Fabric": "100% Cotton", "Pattern": "Checks" })
  },
  {
    id: '4',
    name: 'Temple Border Maheswari',
    category: 'Maheswari Cotton',
    price: '1899',
    description: 'Elegant Maheswari cotton with traditional temple border design woven in zari.',
    emoji: '🛕',
    specs: JSON.stringify({ "Border": "Temple Design", "Zari": "Silver" })
  },
  {
    id: '5',
    name: 'Classic Maroon Soft Silk',
    category: 'Elampillai Soft Silk',
    price: '2599',
    description: 'Rich maroon base with intricately woven gold zari motifs throughout the body.',
    emoji: '❤️',
    specs: JSON.stringify({ "Color": "Maroon", "Zari": "Gold" })
  },
  {
    id: '6',
    name: 'Royal Purple Arani Grand',
    category: 'Arani Silk',
    price: '4500',
    badge: 'Exclusive',
    description: 'A masterpiece from Arani weavers featuring heavy zari pallu and body motifs.',
    emoji: '👑',
    specs: JSON.stringify({ "Occasion": "Bridal", "Pallu": "Heavy Zari" })
  }
];

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            setProducts(data);
            setFilteredProducts(data);
            setIsLoading(false);
            return;
          }
        } catch {
          console.warn("Using placeholder data since Supabase might not be set up properly yet.");
        }
        
        // Fallback to placeholder if no data or error
        setProducts(placeholderProducts);
        setFilteredProducts(placeholderProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter logic
    let result = products;

    if (activeCategory !== "All") {
      result = result.filter(product => product.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#0F3D2E] mb-4">Our Collections</h1>
          <p className="text-[#0F3D2E]/70 font-body max-w-2xl mx-auto">
            Browse our extensive range of authentic sarees. Handpicked for quality, straight from the master weavers to you.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-8">
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#0F3D2E]/40" />
            </div>
            <input
              type="text"
              placeholder="Search sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[#F5E6C8] bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A44C] focus:border-transparent font-body text-[#0F3D2E] shadow-sm transition-all"
            />
          </div>

          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex justify-between items-center text-sm font-body text-[#0F3D2E]/70 border-b border-[#F5E6C8] pb-4">
          <span>Showing {" "}
            <strong className="text-[#0F3D2E]">{filteredProducts.length}</strong> 
            {" "} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
          {activeCategory !== "All" && (
            <span className="bg-[#F5E6C8]/50 px-3 py-1 rounded-full">{activeCategory}</span>
          )}
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default Collections;
