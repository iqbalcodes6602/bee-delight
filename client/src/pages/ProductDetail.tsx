
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Star, ShoppingCart, ArrowLeft, Truck, Shield, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { useReviewStore } from "@/stores/reviewStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("12oz");
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = useProductStore((state) => state.getProduct(Number(id)));
  const addToCart = useCartStore((state) => state.addItem);
  const { user } = useAuthStore();
  const { getProductReviews, getProductRating, addReview } = useReviewStore();

  if (!product) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const reviews = getProductReviews(product.id);
  const { averageRating, totalReviews } = getProductRating(product.id);

  // Mock multiple images for carousel
  const productImages = [
    '/p1.webp',
    '/p2.webp',
    '/p3.png',
    '/p4.png',
  ];

  const sizes = [
    { name: "8oz", price: product.price * 0.75 },
    { name: "12oz", price: product.price },
    { name: "16oz", price: product.price * 1.32 },
    { name: "24oz", price: product.price * 1.8 }
  ];

  const selectedSizePrice = sizes.find(s => s.name === selectedSize)?.price || product.price;
  const totalPrice = selectedSizePrice * quantity;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedSizePrice,
      image: product.image,
      size: selectedSize
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to leave a review.",
        variant: "destructive"
      });
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Review required",
        description: "Please write a review comment.",
        variant: "destructive"
      });
      return;
    }

    addReview({
      productId: product.id,
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment
    });

    setNewReview({ rating: 5, comment: "" });
    toast({
      title: "Review submitted!",
      description: "Thank you for your review.",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-amber-700 mb-6">
          <Link to="/" className="hover:text-amber-900">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-amber-900">All Products</Link>
          <span>/</span>
          <span className="text-amber-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Product Images and Details */}
          <div>
            {/* Image Carousel */}
            <div className="relative mb-6 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 aspect-square rounded-lg overflow-hidden">
              <div className="w-full h-full">
                <img
                  src={productImages[currentImageIndex]}
                  alt="Product"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {productImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2 mb-6">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 transition-colors ${
                    currentImageIndex === index ? "border-amber-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Product Description</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-amber-900 mb-2">Category</h4>
                  <p className="text-gray-700">{product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-amber-900 mb-2">Stock</h4>
                  <p className="text-gray-700">{product.stock} units available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info and Reviews */}
          <div>
            {/* Product Info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-amber-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {averageRating.toFixed(1)} ({totalReviews} reviews)
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-bold text-amber-900">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 text-center border rounded-lg transition-colors ${
                        selectedSize === size.name
                          ? "border-amber-500 bg-amber-50 text-amber-900"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-gray-600">${size.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex space-x-4 mb-6">
                <Button onClick={handleAddToCart} className="flex-1 bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${totalPrice.toFixed(2)}
                </Button>
                <Button variant="outline" className="px-6">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-amber-100 rounded-lg">
                <div className="text-center">
                  <Truck className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-gray-600">On orders $50+</div>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Quality Guarantee</div>
                  <div className="text-xs text-gray-600">100% pure honey</div>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Award Winning</div>
                  <div className="text-xs text-gray-600">Premium quality</div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Customer Reviews</h3>
              
              {/* Overall Rating */}
              <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-amber-900">{averageRating.toFixed(1)}</div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">Based on {totalReviews} reviews</div>
                  </div>
                </div>
              </div>

              {/* Add Review Form */}
              {user && (
                <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Write a Review</h4>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-amber-900 mb-2">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className={`text-2xl ${
                            rating <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-amber-900 mb-2">Review</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full p-3 border border-amber-200 rounded-lg"
                      rows={3}
                      placeholder="Share your thoughts about this product..."
                    />
                  </div>
                  <Button onClick={handleSubmitReview} className="bg-amber-600 hover:bg-amber-700">
                    Submit Review
                  </Button>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-amber-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-amber-900">{review.userName}</h5>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
