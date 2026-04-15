import { MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
  const whatsappNumber = "919994466665";
  const message = `Hi, I'm interested in ${product.name} (₹${product.price})`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Parse specs if it's a string, otherwise use as object
  let specsObj = {};
  if (product.specs) {
    try {
      specsObj = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs;
    } catch (e) {
      console.error("Error parsing specs:", e);
    }
  }

  // Generate a placeholder image based on category if there's no actual image URL
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Elampillai Soft Silk': return 'from-[#8B0000] to-[#FFD700]'; // Deep Red to Gold
      case 'Arani Silk': return 'from-[#4B0082] to-[#FF1493]'; // Indigo to Pink
      case 'Kalyani Cotton': return 'from-[#2F4F4F] to-[#20B2AA]'; // Dark Slate to Light Sea Green
      case 'Maheswari Cotton': return 'from-[#D2691E] to-[#F4A460]'; // Chocolate to Sandy Brown
      default: return 'from-[#0F3D2E] to-[#C9A44C]'; // Theme default
    }
  };

  return (
    <div className="bg-[#FFFDF7] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F5E6C8] group flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Placeholder representing Premium Saree */}
      <div className={`h-64 sm:h-72 w-full bg-gradient-to-tr ${getCategoryColor(product.category)} relative overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay group-hover:bg-black/0 transition-all duration-500"></div>
        {/* Subtle patterned overlay mimicking fabric texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#FFFDF7 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        <span className="text-6xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-500">{product.emoji || '🥻'}</span>
        
        {product.badge && (
          <div className="absolute top-4 right-4 bg-[#FFFDF7] text-[#0F3D2E] px-3 py-1 rounded-full text-xs font-bold font-body shadow-md uppercase tracking-wider">
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium text-[#C9A44C] uppercase tracking-wider font-body">{product.category}</span>
        </div>
        <h3 className="text-xl font-heading font-bold text-[#0F3D2E] mb-2 leading-tight group-hover:text-[#C9A44C] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#0F3D2E]/70 text-sm mb-4 line-clamp-2 font-body flex-grow">
          {product.description}
        </p>
        
        {Object.keys(specsObj).length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {Object.entries(specsObj).slice(0, 3).map(([key, value]) => (
              <span key={key} className="bg-[#F5E6C8]/50 text-[#0F3D2E] text-[10px] px-2 py-1 rounded-md border border-[#F5E6C8] font-medium">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F5E6C8]">
          <span className="text-2xl font-bold text-[#0F3D2E] font-heading tabular-nums block">₹{product.price}</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#20bd5a] transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            aria-label={`Buy ${product.name} on WhatsApp`}
          >
            <MessageCircle size={18} />
            <span className="text-sm font-body hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
