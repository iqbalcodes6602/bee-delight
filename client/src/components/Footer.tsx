
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                🐝
              </div>
              <span className="text-2xl font-bold text-white">Bee Delight</span>
            </div>
            <p className="text-amber-200 mb-6">
              Pure, raw honey from our family to yours. Sustainably sourced and lovingly crafted.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Raw Honey</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Infused Honey</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Gift Boxes</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Bee Products</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Best Sellers</a></li>
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-amber-200 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Returns</a></li>
              <li><Link to="/faq" className="text-amber-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/account?tab=wishlist" className="text-amber-200 hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-amber-200">1-800-HONEY-BEE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-amber-200">hello@beedlight.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-1" />
                <span className="text-amber-200">
                  123 Bee Farm Road<br />
                  Honey Valley, CA 90210
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-amber-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-300 text-sm">
              © 2024 Bee Delight. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-amber-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-amber-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-amber-300 hover:text-white text-sm transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
