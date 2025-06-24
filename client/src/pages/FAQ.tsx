
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What makes your honey raw and unprocessed?",
      answer: "Our honey is never heated above 95°F (35°C), which preserves all the natural enzymes, vitamins, and minerals. We strain it gently to remove any wax particles but never filter it, maintaining its natural properties and health benefits."
    },
    {
      question: "How should I store my honey?",
      answer: "Store honey at room temperature in a dry place. Avoid refrigeration as it can accelerate crystallization. Keep the container tightly sealed to prevent moisture absorption. Properly stored honey can last indefinitely."
    },
    {
      question: "Why has my honey crystallized?",
      answer: "Crystallization is a natural process that occurs in pure, raw honey. It doesn't mean the honey has gone bad. You can gently warm the jar in warm water to return it to liquid form, or enjoy it crystallized - many people prefer the creamy texture!"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship within the United States only. We're working on expanding our shipping options to serve international customers in the future."
    },
    {
      question: "What's the difference between your honey varieties?",
      answer: "Each honey variety comes from different flower sources, giving unique flavors and properties. Wildflower honey has a complex, robust flavor, while Acacia honey is light and delicate. Manuka honey has special antibacterial properties from New Zealand Manuka flowers."
    },
    {
      question: "Is your honey suitable for vegans?",
      answer: "This depends on individual vegan philosophy. Our honey is ethically sourced with bee welfare as a priority, but as it's an animal product, some vegans choose not to consume it while others do."
    },
    {
      question: "Can I give honey to my baby?",
      answer: "Honey should not be given to children under 12 months of age due to the risk of botulism. After 12 months, honey is generally safe and can be a healthy addition to a child's diet."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund or exchange."
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer: "Yes! We offer wholesale pricing for orders over 50 jars. Contact us directly for bulk pricing and availability. We work with restaurants, cafes, and retailers."
    },
    {
      question: "How can I verify the authenticity of your honey?",
      answer: "All our honey comes with certificates of analysis and purity. We're transparent about our sourcing and processing methods. You can also visit our apiary by appointment to see our operation firsthand."
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our honey products, shipping, and more.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-amber-200">
              <CardHeader 
                className="cursor-pointer hover:bg-amber-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <CardTitle className="text-amber-900 flex items-center justify-between">
                  <span>{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </CardTitle>
              </CardHeader>
              {openItems.includes(index) && (
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Still have questions?</h3>
          <p className="text-amber-700 mb-6">
            Can't find what you're looking for? Our customer support team is here to help.
          </p>
          <a href="/contact" className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
