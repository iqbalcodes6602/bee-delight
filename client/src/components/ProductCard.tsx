
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    images: Array<string>;
    rating: number;
    reviews: number;
    description: string;
    badge?: string | null;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { toast } = useToast();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product?.images[0]
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product?.images[0]
      });
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <div className="flex flex-col justify-between group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100">
      {/* Make the entire card clickable */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 p-8 aspect-square">
          <div className="text-6xl text-center">
            <img src={product?.images[0]} style={{borderRadius: '10px'}} />
          </div>
          
          {/* Badge */}
          {product.badge && (
            <Badge 
              className={`absolute top-4 left-4 ${
                product.badge?.toLowerCase() === 'bestseller' ? 'bg-amber-500' :
                product.badge?.toLowerCase() === 'premium' ? 'bg-purple-500' :
                product.badge?.toLowerCase() === 'new' ? 'bg-red-500' :
                product.badge?.toLowerCase() === 'organic' ? 'bg-green-500' :
                'bg-blue-500'
              }`}
            >
              {product.badge}
            </Badge>
          )}
          
          {/* Wishlist button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'text-red-500 fill-red-500' : 'text-amber-600'}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-bold text-lg text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-amber-700 text-sm mb-3">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-amber-900 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-amber-600">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-amber-900">
              Rs. {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-amber-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button - outside the Link to prevent nested navigation */}
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white group-hover:shadow-lg transition-all"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
