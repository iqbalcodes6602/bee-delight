
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">About Bee Delight</h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            We are passionate beekeepers dedicated to bringing you the purest, most delicious honey 
            straight from our family apiaries to your table.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl text-center mb-6">🐝</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Bee Delight was founded in 1995 by the Johnson family in the heart of California's Central Valley. 
              What started as a small hobby has grown into a thriving business built on three generations of 
              beekeeping expertise and a commitment to sustainable practices.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl text-center mb-6">🍯</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in the power of pure, raw honey to nourish both body and soul. Our mission is to 
              provide the highest quality honey products while supporting local ecosystems and promoting 
              bee conservation for future generations.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl text-center mb-6">🌻</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Sustainable Practices</h2>
            <p className="text-gray-700 leading-relaxed">
              We practice sustainable beekeeping methods that prioritize bee health and environmental 
              conservation. Our apiaries are located in pesticide-free areas surrounded by diverse 
              wildflower meadows and organic farms.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-6xl text-center mb-6">🏆</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Quality Promise</h2>
            <p className="text-gray-700 leading-relaxed">
              Every jar of Bee Delight honey is raw, unfiltered, and never heated above 95°F. 
              This ensures that all the natural enzymes, antioxidants, and beneficial properties 
              remain intact for maximum nutritional value.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Purity</h3>
              <p className="text-gray-700">100% pure, raw honey with no additives or processing</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Sustainability</h3>
              <p className="text-gray-700">Environmentally responsible beekeeping practices</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">Community</h3>
              <p className="text-gray-700">Supporting local farmers and bee conservation efforts</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
