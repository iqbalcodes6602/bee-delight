
import { useState } from "react";
import { ShoppingBag, Search, User, Heart, Menu, X, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-amber-600 text-white text-center py-2 text-sm">
        🍯 Free shipping on orders over Rs.50 | Pure, raw honey from our family to yours
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              🐝
            </div>
            <span className="text-2xl font-bold text-amber-900">Bee Delight</span>
          </Link>

          {/* Search Bar - Desktop */}
          {showSearch && (
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                  autoFocus
                />
              </div>
              <Button type="submit" variant="default" className="ml-2" style={{backgroundColor: "rgb(217 119 8)"}}>
                Search
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowSearch(false)} className="ml-2">
                <X className="h-4 w-4" />
              </Button>
            </form>
          )}

          {/* Desktop Navigation */}
          {!showSearch && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-amber-900 hover:text-amber-600 font-medium">All Products</Link>
              <Link to="/about" className="text-amber-900 hover:text-amber-600 font-medium">About</Link>
              <Link to="/blog" className="text-amber-900 hover:text-amber-600 font-medium">Blog</Link>
            </nav>
          )}

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-amber-900 hover:text-amber-600"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* User Account Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-amber-900 hover:text-amber-600">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-amber-900 hover:text-amber-600">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link to="/account?tab=wishlist">
              <Button variant="ghost" size="icon" className="text-amber-900 hover:text-amber-600">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-amber-900 hover:text-amber-600 relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-amber-900 hover:text-amber-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
              <Button type="submit" variant="default" className="ml-2" style={{backgroundColor: "rgb(217 119 8)"}}>
                Search
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowSearch(false)}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-amber-100 bg-white">
            <nav className="flex flex-col space-y-4 py-4">
              <Link to="/products" className="text-amber-900 hover:text-amber-600 font-medium">All Products</Link>
              <Link to="/about" className="text-amber-900 hover:text-amber-600 font-medium">About</Link>
              <Link to="/blog" className="text-amber-900 hover:text-amber-600 font-medium">Blog</Link>
              {user ? (
                <>
                  <Link to="/account" className="text-amber-900 hover:text-amber-600 font-medium">Account</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-amber-900 hover:text-amber-600 font-medium">Admin</Link>
                  )}
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium text-left">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-amber-900 hover:text-amber-600 font-medium">Login</Link>
              )}
              <Link to="/cart" className="text-amber-900 hover:text-amber-600 font-medium">Cart</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
