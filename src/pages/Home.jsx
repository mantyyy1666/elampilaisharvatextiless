import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import ProductGrid from '../components/ProductGrid';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        // Fallback dummy data in case Supabase isn't configured yet
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(4);
            
          if (error) {
            console.error("Supabase Error:", error.message);
            throw error;
          }
          
          if (data && data.length > 0) {
            setFeaturedProducts(data);
            setIsLoading(false);
            return;
          }
        } catch {
          console.warn("Using placeholder data since Supabase might not be set up properly yet.");
        }

        // Placeholder data
        setFeaturedProducts([
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
          }
        ]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-[#FFFDF7] overflow-hidden">
        <div className="absolute top-[-10%] md:top-[-20%] right-[-5%] w-[60%] h-[120%] bg-[#F5E6C8]/40 rounded-l-full blur-3xl rounded-tl-none border-l-[100px] border-[#C9A44C]/10 transform rotate-12 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="inline-block px-4 py-1.5 bg-[#F5E6C8] text-[#0F3D2E] rounded-full text-sm font-medium tracking-wide">
              DIRECT FROM WEAVERS 🌿
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#0F3D2E] leading-[1.1]">
              Elegance Woven<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F3D2E] to-[#C9A44C]">
                Into Every Thread.
              </span>
            </h1>
            <p className="text-lg text-[#0F3D2E]/80 font-body max-w-lg leading-relaxed">
              Discover authentic Elampillai wholesale sarees at unbeatable prices. Premium quality silk and cotton straight from the looms to your wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/collections" className="bg-[#0F3D2E] text-[#FFFDF7] px-8 py-4 rounded-full font-medium hover:bg-[#C9A44C] transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 group">
                Shop Collections
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a href="https://wa.me/919994466665" target="_blank" rel="noopener noreferrer" className="bg-transparent text-[#0F3D2E] border-2 border-[#0F3D2E] px-8 py-4 rounded-full font-medium hover:bg-[#0F3D2E] hover:text-[#FFFDF7] transition-all duration-300 text-center">
                Wholesale Enquiry
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-in zoom-in duration-1000 delay-200">
            <div className="aspect-[4/5] bg-gradient-to-tr from-[#0F3D2E] to-[#C9A44C] rounded-[2rem] overflow-hidden relative shadow-2xl transform md:rotate-3 transition-transform hover:rotate-0 duration-500 flex items-center justify-center">
               <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
               <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#FFFDF7 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
               <div className="text-9xl filter drop-shadow-xl z-10 animate-bounce" style={{animationDuration: '3s'}}>🥻</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FFFDF7] p-5 rounded-2xl shadow-xl border border-[#F5E6C8]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#F5E6C8] border-2 border-[#FFFDF7] flex items-center justify-center text-xs">👤</div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F3D2E]">10k+ Customers</div>
                  <div className="text-xs text-[#C9A44C] flex items-center"><Star size={12} fill="currentColor" /> 4.9/5 Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#0F3D2E] py-16 text-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 space-y-4">
              <div className="w-16 h-16 bg-[#C9A44C]/20 rounded-full flex items-center justify-center text-[#C9A44C] mb-2">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">100% Authentic Quality</h3>
              <p className="opacity-80 font-body text-sm">Genuine materials and pure zari guaranteed in every weave.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-4 border-t md:border-t-0 md:border-l md:border-r border-[#FFFDF7]/10">
              <div className="w-16 h-16 bg-[#C9A44C]/20 rounded-full flex items-center justify-center text-[#C9A44C] mb-2">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Fast & Secure Shipping</h3>
              <p className="opacity-80 font-body text-sm">Reliable delivery across India and international destinations.</p>
            </div>
            <div className="flex flex-col items-center p-6 space-y-4 border-t md:border-t-0 border-[#FFFDF7]/10">
              <div className="w-16 h-16 bg-[#C9A44C]/20 rounded-full flex items-center justify-center text-[#C9A44C] mb-2">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold">Best Wholesale Prices</h3>
              <p className="opacity-80 font-body text-sm">Direct from the weavers to you, ensuring maximum value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#FFFDF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C9A44C] font-semibold tracking-widest uppercase text-sm mb-2 block font-body">Handpicked For You</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#0F3D2E]">Featured Collections</h2>
            <div className="w-24 h-1 bg-[#C9A44C] mx-auto mt-6 rounded-full"></div>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} error={error} />
          
          <div className="mt-16 text-center">
            <Link to="/collections" className="inline-flex items-center gap-2 text-[#0F3D2E] font-medium hover:text-[#C9A44C] border-b-2 border-transparent hover:border-[#C9A44C] pb-1 transition-all">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Category Banner */}
      <section className="py-16 bg-[#F5E6C8]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F3D2E] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A44C]/20 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
             
             <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center z-10">
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#FFFDF7] mb-6 leading-tight">
                 The Elampillai <br/>
                 <span className="text-[#C9A44C]">Legacy</span>
               </h2>
               <p className="text-[#FFFDF7]/80 font-body mb-8 leading-relaxed">
                 Known for its intricate designs and lightweight comfort, Elampillai soft silk is perfect for both grand occasions and elegant daily wear. Explore our exclusive range woven with passion.
               </p>
               <Link to="/collections" className="bg-[#C9A44C] text-[#0F3D2E] w-fit px-8 py-3 rounded-full font-bold hover:bg-[#FFFDF7] transition-colors shadow-lg">
                 Explore Elampillai Silk
               </Link>
             </div>
             
             {/* Abstract Representation of Weaving/Saree */}
             <div className="md:w-1/2 bg-gradient-to-br from-[#0a2e22] to-[#0F3D2E] p-8 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 flex flex-col justify-between py-4">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-[#C9A44C]"></div>
                  ))}
               </div>
               <div className="absolute inset-0 opacity-20 flex justify-between px-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-full w-px bg-[#C9A44C]"></div>
                  ))}
               </div>
               <div className="z-10 w-2/3 aspect-square bg-[#B8860B] rounded-full mix-blend-screen filter blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
               <div className="z-10 text-8xl absolute transform -rotate-12 drop-shadow-2xl">🧵</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
