import { useEffect, useState, useMemo } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/stores/productStore";

const Products = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    fetchProducts({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchTerm || undefined,
      sortBy,
      sortOrder,
    });
  }, [searchTerm, selectedCategory, sortBy, sortOrder]);

  // get price extents
  const priceExtents = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
      );
    });
  }, [products, priceRange]);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">All Products</h1>
          <p className="text-amber-700">Discover our complete collection of premium honey products</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* optionally you can hardcode or fetch categories separately */}
                <SelectItem value="raw-honey">Raw Honey</SelectItem>
                <SelectItem value="premium-honey">Premium Honey</SelectItem>
                <SelectItem value="honey-products">Honey Products</SelectItem>
                <SelectItem value="gift-sets">Gift Sets</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center space-x-2"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
            </Button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={priceExtents.max}
              min={priceExtents.min}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍯</div>
            <h3 className="text-2xl font-bold text-amber-900 mb-2">No products found</h3>
            <p className="text-amber-700 mb-6">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange([priceExtents.min, priceExtents.max]);
              }}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
