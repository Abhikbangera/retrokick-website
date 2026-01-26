import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProductCard } from '@/app/components/ProductCard';
import { products } from '@/app/data/products';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';

export function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.team.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1
            className="text-6xl md:text-8xl mb-4 bg-gradient-to-r from-white to-[#00ff9d] bg-clip-text text-transparent"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SHOP ALL JERSEYS
          </h1>
          <p className="text-white/70 text-lg">
            {filteredProducts.length} products available
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search jerseys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ff9d] transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ff9d] transition-colors cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-6 py-4 bg-[#1a1a2e] border border-white/10 rounded-lg text-white flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <motion.div
            initial={false}
            animate={{ height: showFilters || isDesktop ? 'auto' : 0 }}
            className="overflow-hidden lg:overflow-visible"
          >
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'All', value: 'all' },
                { label: 'Retro', value: 'retro' },
                { label: 'Club', value: 'club' },
                { label: 'International', value: 'international' },
              ].map((category) => (
                <motion.button
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-[#00ff9d] to-[#00d9ff] text-black'
                      : 'bg-[#1a1a2e] border border-white/10 text-white hover:border-[#00ff9d]'
                  }`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl text-white/70 mb-2">No products found</h3>
            <p className="text-white/50">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}