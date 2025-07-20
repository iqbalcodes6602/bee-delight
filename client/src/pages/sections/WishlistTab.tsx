import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const WishlistTab = () => {
  const { 
    items: wishlistItems, 
    loading,
    error,
    fetchWishlist,
    removeItem: removeFromWishlist 
  } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addWishlistToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      images: item.images
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-900">Wishlist</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p>Loading your wishlist...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-900">Wishlist</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
          <Button 
            onClick={fetchWishlist}
            className="mt-4 bg-amber-600 hover:bg-amber-700"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-amber-900">Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="text-center bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded mb-3">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-32 object-contain mx-auto"
                  />
                </div>
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-amber-600 font-bold mb-3">${item.price}</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-amber-600 hover:bg-amber-700"
                    onClick={() => addWishlistToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};