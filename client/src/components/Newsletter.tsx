
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Mail className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Sweet with Our Newsletter
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Get exclusive offers, honey recipes, and bee-keeping tips delivered straight to your inbox
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/90 border-0 text-amber-900 placeholder:text-amber-600"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-amber-600 hover:bg-amber-50 font-medium px-8"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-amber-100 text-sm mt-4">
            No spam, just sweet updates. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
