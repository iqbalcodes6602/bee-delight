import { useEffect, useMemo } from "react";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";


const FeaturedProducts = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = useMemo(() => {
    const withBadge = products.filter((p) => p.badge);
    const withoutBadge = products.filter((p) => !p.badge);
    return [...withBadge, ...withoutBadge].slice(0, 4);
  }, [products]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Discover our most loved honey varieties, carefully selected for their exceptional quality and taste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
