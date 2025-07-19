
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🌿 100% Pure & Natural
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-amber-900 mb-6 leading-tight">
              Nature's Golden
              <span className="block text-amber-600">Sweetness</span>
            </h1>
            
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              Discover our premium collection of raw, unfiltered honey sourced directly from sustainable beekeepers. 
              Pure taste, natural goodness, delivered fresh to your door.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  Shop All Honey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            {/* <div className="aspect-square bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full p-8">
              <div className="w-full h-full bg-amber-400 rounded-full flex items-center justify-center text-8xl">
                🍯aa
              </div>
            </div> */}
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full p-8 overflow-hidden">
              <div className="w-full h-full bg-amber-400 rounded-full flex items-center justify-center text-8xl relative overflow-hidden">
                <video
                  src="v2_comp.mp4"
                  autoPlay
                  loop
                  muted
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-8 -left-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">100%</div>
                <div className="text-sm text-amber-800">Pure</div>
              </div>
            </div>
            
            <div className="absolute bottom-8 -right-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Raw</div>
                <div className="text-sm text-green-800">Unfiltered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
