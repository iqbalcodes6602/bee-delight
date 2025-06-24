
import ProductCard from "@/components/ProductCard";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Wildflower Raw Honey",
      price: 24.99,
      originalPrice: 29.99,
      image: "/p1.webp",
      rating: 4.8,
      reviews: 127,
      description: "A delicate blend of wildflower nectar",
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Manuka Honey Premium",
      price: 89.99,
      image: "/p2.webp",
      rating: 4.9,
      reviews: 203,
      description: "Premium grade Manuka honey from New Zealand",
      badge: "Premium"
    },
    {
      id: 3,
      name: "Lavender Infused Honey",
      price: 32.99,
      image: "/p3.png",
      rating: 4.7,
      reviews: 89,
      description: "Soothing lavender essence in pure honey",
      badge: "New"
    },
    {
      id: 4,
      name: "Clover Blossom Honey",
      price: 19.99,
      image: "/p4.png",
      rating: 4.6,
      reviews: 156,
      description: "Classic light and mild clover honey",
      badge: null
    }
  ];

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
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
