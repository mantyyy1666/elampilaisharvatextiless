const categories = [
  "All",
  "Elampillai Soft Silk",
  "Arani Silk",
  "Kalyani Cotton",
  "Maheswari Cotton"
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-body shadow-sm
            ${
              activeCategory === category
                ? 'bg-[#0F3D2E] text-[#FFFDF7] shadow-md scale-105 ring-2 ring-[#C9A44C] ring-offset-2 ring-offset-[#FFFDF7]'
                : 'bg-[#FFFDF7] text-[#0F3D2E] border border-[#F5E6C8] hover:border-[#C9A44C] hover:bg-[#F5E6C8]/30 hover:shadow-md'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
