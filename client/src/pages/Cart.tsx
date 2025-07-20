
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { useEffect } from "react";

const Cart = () => {
  const { items, total, updateQuantity, removeItem } = useCartStore();

  const shipping = total > 50 ? 0 : 8.99;
  const finalTotal = total + shipping;

  const fetchCart = async () => {
    try {
      await useCartStore.getState().fetchCart();
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-24 w-24 text-amber-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any honey to your cart yet.</p>
          <Link to="/products">
            <Button className="bg-amber-600 hover:bg-amber-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/products" className="text-amber-600 hover:text-amber-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-amber-900">Shopping Cart</h1>
          <span className="text-gray-600">({items.length} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size}`} className={`p-6 ${index !== items.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg flex items-center justify-center text-2xl">
                      <img src={item.image} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900">{item.name}</h3>
                      {item.size && <p className="text-gray-600 text-sm">{item.size}</p>}
                      <p className="text-lg font-bold text-amber-700">Rs. {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-amber-900">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-amber-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `Rs. ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-green-600 text-sm">🎉 You qualify for free shipping!</p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>Rs. {finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h3 className="font-medium text-amber-900 mb-2">🍯 Sweet Deal!</h3>
                <p className="text-sm text-amber-700">
                  {total < 25 
                    ? `Add $${(25 - total).toFixed(2)} more to your order and get a free honey stick sampler pack!`
                    : "You qualify for our free honey stick sampler pack!"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
