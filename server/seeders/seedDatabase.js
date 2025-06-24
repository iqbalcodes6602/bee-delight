const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Review = require('../models/Review');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const BlogPost = require('../models/BlogPost');
const Coupon = require('../models/Coupon');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Clear all collections
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Cart.deleteMany({});
    await Wishlist.deleteMany({});
    await BlogPost.deleteMany({});
    await Coupon.deleteMany({});
    console.log('🗑️  Database cleared');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@goldenhive.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1234567890',
        addresses: [
          {
            type: 'work',
            address: '123 Admin Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            isDefault: true
          }
        ],
        isActive: true,
        lastLogin: new Date()
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1987654321',
        addresses: [
          {
            type: 'home',
            address: '456 Oak Avenue',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90210',
            isDefault: true
          },
          {
            type: 'work',
            address: '789 Business Blvd',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90211',
            isDefault: false
          }
        ],
        isActive: true,
        lastLogin: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1555666777',
        addresses: [
          {
            type: 'home',
            address: '321 Pine Street',
            city: 'Chicago',
            state: 'IL',
            zip: '60601',
            isDefault: true
          }
        ],
        isActive: true,
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1444555666',
        addresses: [
          {
            type: 'home',
            address: '654 Maple Drive',
            city: 'Houston',
            state: 'TX',
            zip: '77001',
            isDefault: true
          }
        ],
        isActive: true,
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'user',
        phone: '+1333444555',
        addresses: [
          {
            type: 'home',
            address: '987 Cedar Lane',
            city: 'Phoenix',
            state: 'AZ',
            zip: '85001',
            isDefault: true
          }
        ],
        isActive: false, // Inactive user for testing
        lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 1 month ago
      }
    ];

    const createdUsers = await User.create(users);
    console.log('👥 Users seeded successfully');
    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

// Seed Products
const seedProducts = async () => {
  try {
    const products = [
      {
        name: 'Pure Wildflower Honey',
        description: 'Our signature wildflower honey is harvested from pristine meadows, offering a complex floral bouquet with notes of clover, dandelion, and wildflowers. This raw, unfiltered honey retains all its natural enzymes and nutrients.',
        price: 24.99,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'raw-honey',
        stock: 50,
        badge: 'bestseller',
        rating: 4.8,
        numReviews: 24,
        isActive: true
      },
      {
        name: 'Organic Acacia Honey',
        description: 'Light, delicate acacia honey with a mild, sweet flavor. This premium organic honey is perfect for tea, baking, or enjoying straight from the jar. Slow to crystallize and beautifully clear.',
        price: 32.99,
        originalPrice: 39.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'organic-honey',
        stock: 30,
        badge: 'organic',
        rating: 4.9,
        numReviews: 18,
        isActive: true
      },
      {
        name: 'Manuka Honey UMF 15+',
        description: 'Premium New Zealand Manuka honey with UMF 15+ rating. Known for its unique antibacterial properties and rich, earthy flavor. Perfect for wellness and therapeutic use.',
        price: 89.99,
        originalPrice: 109.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'raw-honey',
        stock: 15,
        badge: 'premium',
        rating: 4.7,
        numReviews: 12,
        isActive: true
      },
      {
        name: 'Lavender Infused Honey',
        description: 'Delicate honey infused with organic lavender flowers. This aromatic honey offers a floral, calming flavor perfect for evening tea or drizzling over desserts.',
        price: 28.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'flavored-honey',
        stock: 25,
        badge: 'new',
        rating: 4.6,
        numReviews: 8,
        isActive: true
      },
      {
        name: 'Cinnamon Spiced Honey',
        description: 'Warm, comforting honey blended with Ceylon cinnamon. Perfect for adding a spicy-sweet touch to your morning oatmeal, toast, or hot beverages.',
        price: 26.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'flavored-honey',
        stock: 35,
        rating: 4.5,
        numReviews: 15,
        isActive: true
      },
      {
        name: 'Honey & Oat Face Mask',
        description: 'Natural skincare made with our pure honey and organic oats. This gentle exfoliating mask leaves skin soft, smooth, and naturally glowing.',
        price: 19.99,
        originalPrice: 24.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'honey-products',
        stock: 40,
        badge: 'sale',
        rating: 4.4,
        numReviews: 22,
        isActive: true
      },
      {
        name: 'Honey Lip Balm Set',
        description: 'Set of 3 nourishing lip balms made with our pure honey, beeswax, and essential oils. Flavors include vanilla, mint, and original honey.',
        price: 15.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'honey-products',
        stock: 60,
        rating: 4.3,
        numReviews: 31,
        isActive: true
      },
      {
        name: 'Clover Honey',
        description: 'Classic American clover honey with a mild, sweet flavor. This versatile honey is perfect for everyday use in cooking, baking, and sweetening beverages.',
        price: 18.99,
        originalPrice: 22.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'raw-honey',
        stock: 45,
        rating: 4.2,
        numReviews: 19,
        isActive: true
      },
      {
        name: 'Honey Tasting Gift Set',
        description: 'Perfect gift set featuring 4 mini jars of our finest honey varieties: Wildflower, Acacia, Orange Blossom, and Buckwheat. Beautifully packaged with tasting notes.',
        price: 49.99,
        originalPrice: 59.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'gift-sets',
        stock: 20,
        badge: 'bestseller',
        rating: 4.9,
        numReviews: 35,
        isActive: true
      },
      {
        name: 'Orange Blossom Honey',
        description: 'Fragrant honey with delicate citrus notes from orange blossoms. Light amber color with a fresh, floral taste that pairs beautifully with cheese and fruit.',
        price: 27.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'raw-honey',
        stock: 28,
        rating: 4.6,
        numReviews: 14,
        isActive: true
      },
      {
        name: 'Buckwheat Honey',
        description: 'Dark, robust honey with a rich, molasses-like flavor. High in antioxidants and minerals, this distinctive honey is prized by connoisseurs for its bold taste.',
        price: 31.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'raw-honey',
        stock: 22,
        rating: 4.1,
        numReviews: 9,
        isActive: true
      },
      {
        name: 'Honey Granola',
        description: 'Artisanal granola made with our pure honey, organic oats, nuts, and dried fruits. Perfect for breakfast or as a healthy snack.',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        category: 'honey-products',
        stock: 55,
        rating: 4.4,
        numReviews: 27,
        isActive: true
      }
    ];

    const createdProducts = await Product.create(products);
    console.log('🍯 Products seeded successfully');
    return createdProducts;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

// Seed Reviews
const seedReviews = async (users, products) => {
  try {
    const reviews = [
      {
        product: products[0]._id, // Pure Wildflower Honey
        user: users[1]._id, // John Doe
        rating: 5,
        comment: 'Absolutely amazing honey! The flavor is incredible and you can taste the quality. Will definitely order again.'
      },
      {
        product: products[0]._id,
        user: users[2]._id, // Jane Smith
        rating: 4,
        comment: 'Great honey, very natural taste. Packaging was excellent and delivery was fast.'
      },
      {
        product: products[1]._id, // Organic Acacia Honey
        user: users[3]._id, // Mike Johnson
        rating: 5,
        comment: 'This acacia honey is perfect for my morning tea. Light and delicate flavor, exactly what I was looking for.'
      },
      {
        product: products[2]._id, // Manuka Honey
        user: users[1]._id,
        rating: 5,
        comment: 'Expensive but worth every penny. The quality is outstanding and I can feel the health benefits.'
      },
      {
        product: products[3]._id, // Lavender Infused Honey
        user: users[2]._id,
        rating: 4,
        comment: 'Beautiful lavender aroma and taste. Very relaxing, perfect for evening tea.'
      },
      {
        product: products[8]._id, // Honey Tasting Gift Set
        user: users[3]._id,
        rating: 5,
        comment: 'Bought this as a gift and it was a huge hit! Great variety and beautiful presentation.'
      },
      {
        product: products[5]._id, // Honey & Oat Face Mask
        user: users[2]._id,
        rating: 4,
        comment: 'My skin feels so soft after using this mask. Natural ingredients and great results.'
      },
      {
        product: products[0]._id,
        user: users[3]._id,
        rating: 5,
        comment: 'Best honey I\'ve ever tasted. Raw and unfiltered just like it should be.'
      }
    ];

    await Review.create(reviews);
    console.log('⭐ Reviews seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
  }
};

// Seed Orders
const seedOrders = async (users, products) => {
  try {
    const orders = [
      {
        user: users[1]._id, // John Doe
        orderItems: [
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 2
          },
          {
            product: products[3]._id,
            name: products[3].name,
            price: products[3].price,
            quantity: 1
          }
        ],
        shippingAddress: {
          name: 'John Doe',
          email: 'john@example.com',
          address: '456 Oak Avenue',
          city: 'Los Angeles',
          zipCode: '90210'
        },
        subtotal: 78.97,
        total: 78.97,
        status: 'delivered',
        paymentStatus: 'paid',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      },
      {
        user: users[2]._id, // Jane Smith
        orderItems: [
          {
            product: products[1]._id,
            name: products[1].name,
            price: products[1].price,
            quantity: 1
          },
          {
            product: products[5]._id,
            name: products[5].name,
            price: products[5].price,
            quantity: 2
          }
        ],
        shippingAddress: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          address: '321 Pine Street',
          city: 'Chicago',
          zipCode: '60601'
        },
        subtotal: 72.97,
        total: 72.97,
        status: 'shipped',
        paymentStatus: 'paid',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        user: users[3]._id, // Mike Johnson
        orderItems: [
          {
            product: products[8]._id,
            name: products[8].name,
            price: products[8].price,
            quantity: 1
          }
        ],
        shippingAddress: {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          address: '654 Maple Drive',
          city: 'Houston',
          zipCode: '77001'
        },
        subtotal: 49.99,
        total: 49.99,
        status: 'processing',
        paymentStatus: 'paid',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        user: users[1]._id,
        orderItems: [
          {
            product: products[2]._id,
            name: products[2].name,
            price: products[2].price,
            quantity: 1
          }
        ],
        shippingAddress: {
          name: 'John Doe',
          email: 'john@example.com',
          address: '456 Oak Avenue',
          city: 'Los Angeles',
          zipCode: '90210'
        },
        subtotal: 89.99,
        total: 89.99,
        status: 'pending',
        paymentStatus: 'paid',
        createdAt: new Date() // Today
      }
    ];

    await Order.create(orders);
    console.log('📦 Orders seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding orders:', error);
  }
};

// Seed Carts
const seedCarts = async (users, products) => {
  try {
    const carts = [
      {
        user: users[1]._id, // John Doe
        items: [
          {
            product: products[4]._id,
            quantity: 1,
            size: '500g'
          },
          {
            product: products[6]._id,
            quantity: 2,
            size: '250g'
          }
        ]
      },
      {
        user: users[2]._id, // Jane Smith
        items: [
          {
            product: products[7]._id,
            quantity: 1,
            size: '500g'
          }
        ]
      }
    ];

    await Cart.create(carts);
    console.log('🛒 Carts seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding carts:', error);
  }
};

// Seed Wishlists
const seedWishlists = async (users, products) => {
  try {
    const wishlists = [
      {
        user: users[1]._id, // John Doe
        items: [
          { product: products[2]._id },
          { product: products[9]._id },
          { product: products[10]._id }
        ]
      },
      {
        user: users[2]._id, // Jane Smith
        items: [
          { product: products[1]._id },
          { product: products[8]._id }
        ]
      },
      {
        user: users[3]._id, // Mike Johnson
        items: [
          { product: products[0]._id },
          { product: products[3]._id },
          { product: products[11]._id }
        ]
      }
    ];

    await Wishlist.create(wishlists);
    console.log('❤️  Wishlists seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding wishlists:', error);
  }
};

// Seed Blog Posts
const seedBlogPosts = async (users) => {
  try {
    const blogPosts = [
      {
        title: 'The Health Benefits of Raw Honey',
        content: `Raw honey is more than just a natural sweetener – it's a powerhouse of nutrients and health benefits that have been recognized for thousands of years. Unlike processed honey, raw honey retains all of its natural enzymes, antioxidants, and beneficial compounds.

## What Makes Raw Honey Special?

Raw honey is honey in its purest form, straight from the hive without any heating or processing. This means it retains:

- **Natural enzymes** that aid in digestion
- **Antioxidants** that fight free radicals
- **Antibacterial properties** that support immune health
- **Vitamins and minerals** including B vitamins, vitamin C, and potassium

## Key Health Benefits

### 1. Immune System Support
Raw honey contains natural antibacterial and antiviral properties that can help boost your immune system and fight off infections.

### 2. Digestive Health
The enzymes in raw honey can help improve digestion and promote a healthy gut microbiome.

### 3. Wound Healing
Honey has been used for centuries as a natural wound healer due to its antibacterial properties and ability to promote tissue regeneration.

### 4. Cough and Sore Throat Relief
Raw honey can soothe irritated throats and suppress coughs naturally.

## How to Incorporate Raw Honey into Your Diet

- Add a spoonful to your morning tea or coffee
- Drizzle over yogurt or oatmeal
- Use as a natural sweetener in baking
- Enjoy straight from the jar for a quick energy boost

Remember, a little goes a long way – raw honey is still a form of sugar and should be consumed in moderation as part of a balanced diet.`,
        excerpt: 'Discover the incredible health benefits of raw honey and learn why this natural sweetener is so much more than just a sugar substitute.',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        author: users[0]._id, // Admin
        published: true,
        tags: ['health', 'raw-honey', 'nutrition', 'wellness'],
        views: 245,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 2 weeks ago
      },
      {
        title: 'Understanding Different Types of Honey',
        content: `Not all honey is created equal. The type of flowers that bees visit to collect nectar determines the flavor, color, and characteristics of the honey they produce. Let's explore some of the most popular varieties and what makes each one unique.

## Wildflower Honey
This is perhaps the most common type of honey, made from the nectar of various wildflowers. The flavor can vary depending on the season and location, but it typically has a complex, floral taste.

## Acacia Honey
Known for its light color and mild, delicate flavor, acacia honey is slow to crystallize and has a clean, sweet taste that doesn't overpower other flavors.

## Manuka Honey
Originating from New Zealand, Manuka honey is prized for its unique antibacterial properties and rich, earthy flavor. It's often used for medicinal purposes.

## Clover Honey
A classic American honey with a mild, sweet flavor. It's versatile and perfect for everyday use in cooking and baking.

## Orange Blossom Honey
This honey has a light, citrusy flavor with floral notes. It's perfect for tea and pairs beautifully with cheese.

## Buckwheat Honey
Dark and robust with a molasses-like flavor, buckwheat honey is high in antioxidants and has a bold taste that's not for everyone.

## Choosing the Right Honey

When selecting honey, consider:
- **Flavor preference**: Mild vs. bold
- **Intended use**: Cooking, baking, or eating straight
- **Health benefits**: Some varieties offer specific therapeutic properties
- **Origin**: Local honey may help with seasonal allergies

Each type of honey offers its own unique characteristics and benefits, making the world of honey endlessly fascinating to explore.`,
        excerpt: 'Learn about the different types of honey available and discover which varieties might be perfect for your taste preferences and needs.',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        author: users[0]._id, // Admin
        published: true,
        tags: ['honey-types', 'education', 'varieties'],
        views: 189,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      },
      {
        title: 'Sustainable Beekeeping Practices',
        content: `At Golden Hive, we're committed to sustainable beekeeping practices that protect both our bees and the environment. Here's how we ensure our honey production is ethical and environmentally responsible.

## Our Commitment to Bee Welfare

### Natural Hive Management
We use natural beekeeping methods that work with the bees' natural behaviors rather than against them. This includes:
- Minimal hive intervention
- Natural comb building
- Seasonal management that respects bee cycles

### Chemical-Free Approach
We avoid the use of synthetic chemicals and antibiotics in our hives, instead relying on:
- Natural mite treatments
- Organic disease prevention methods
- Healthy hive placement in pesticide-free areas

## Environmental Stewardship

### Habitat Preservation
We work to preserve and enhance bee habitats by:
- Planting bee-friendly flowers and plants
- Maintaining diverse foraging areas
- Protecting natural ecosystems

### Sustainable Harvesting
We only harvest surplus honey, ensuring bees have enough for their own needs:
- Leave adequate honey stores for winter
- Harvest at appropriate times
- Monitor hive health continuously

## Supporting Local Ecosystems

Our beekeeping practices benefit the entire ecosystem:
- **Pollination services**: Our bees help pollinate local crops and wild plants
- **Biodiversity support**: Healthy bee populations support diverse plant communities
- **Educational outreach**: We teach others about the importance of bees

## The Future of Beekeeping

We're constantly researching and implementing new sustainable practices:
- Integrated pest management
- Climate-adaptive beekeeping
- Technology for hive monitoring
- Collaboration with conservation organizations

By choosing Golden Hive honey, you're supporting sustainable beekeeping practices that protect bees and preserve the environment for future generations.`,
        excerpt: 'Learn about our commitment to sustainable beekeeping practices and how we protect both our bees and the environment.',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        author: users[0]._id, // Admin
        published: true,
        tags: ['sustainability', 'beekeeping', 'environment', 'conservation'],
        views: 156,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        title: 'Honey in Skincare: Natural Beauty Benefits',
        content: `Honey has been used in skincare for thousands of years, and for good reason. This natural ingredient offers incredible benefits for all skin types. Let's explore how honey can transform your skincare routine.

## Why Honey is Perfect for Skincare

### Natural Humectant
Honey naturally draws moisture from the air and locks it into your skin, making it an excellent natural moisturizer.

### Antibacterial Properties
The natural antibacterial properties of honey help fight acne-causing bacteria and prevent breakouts.

### Gentle Exfoliation
Honey contains natural enzymes that gently exfoliate dead skin cells, revealing smoother, brighter skin.

### Anti-Aging Benefits
Rich in antioxidants, honey helps fight free radicals that contribute to premature aging.

## DIY Honey Skincare Recipes

### Simple Honey Face Mask
- 2 tablespoons raw honey
- Apply to clean face, leave for 15-20 minutes
- Rinse with warm water

### Honey Oat Exfoliating Mask
- 2 tablespoons raw honey
- 1 tablespoon ground oats
- Mix and gently massage onto face
- Leave for 10 minutes, then rinse

### Honey Lip Scrub
- 1 tablespoon honey
- 1 tablespoon brown sugar
- Gently scrub lips, then rinse

## Choosing the Right Honey for Skincare

Not all honey is suitable for skincare:
- **Raw honey** is best as it retains all beneficial properties
- **Manuka honey** offers extra antibacterial benefits
- **Avoid processed honey** which lacks beneficial enzymes

## Tips for Using Honey in Skincare

1. Always patch test first
2. Use raw, unprocessed honey
3. Apply to slightly damp skin for better absorption
4. Be gentle when removing honey masks
5. Follow with your regular moisturizer

Incorporating honey into your skincare routine is a natural, effective way to achieve healthy, glowing skin without harsh chemicals.`,
        excerpt: 'Discover how honey can revolutionize your skincare routine with its natural moisturizing, antibacterial, and anti-aging properties.',
        image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
        author: users[0]._id, // Admin
        published: false, // Draft post
        tags: ['skincare', 'beauty', 'natural', 'diy'],
        views: 0,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ];

    await BlogPost.create(blogPosts);
    console.log('📝 Blog posts seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding blog posts:', error);
  }
};

// Seed Coupons
const seedCoupons = async () => {
  try {
    const coupons = [
      {
        code: 'WELCOME10',
        description: 'Welcome discount for new customers',
        discountType: 'percentage',
        discountValue: 10,
        minOrderAmount: 25,
        maxUses: 100,
        currentUses: 15,
        validFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true
      },
      {
        code: 'HONEY20',
        description: '20% off on all honey products',
        discountType: 'percentage',
        discountValue: 20,
        minOrderAmount: 50,
        maxUses: 50,
        currentUses: 8,
        validFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true
      },
      {
        code: 'FREESHIP',
        description: 'Free shipping on orders over $75',
        discountType: 'fixed',
        discountValue: 9.99,
        minOrderAmount: 75,
        maxUses: null, // Unlimited
        currentUses: 23,
        validFrom: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        isActive: true
      },
      {
        code: 'SUMMER25',
        description: 'Summer special - 25% off',
        discountType: 'percentage',
        discountValue: 25,
        minOrderAmount: 100,
        maxUses: 25,
        currentUses: 25, // Fully used
        validFrom: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        validTo: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago (expired)
        isActive: false
      },
      {
        code: 'BULK15',
        description: '15% off on bulk orders',
        discountType: 'percentage',
        discountValue: 15,
        minOrderAmount: 150,
        maxUses: 20,
        currentUses: 3,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        isActive: true
      }
    ];

    await Coupon.create(coupons);
    console.log('🎫 Coupons seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding coupons:', error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    await clearDatabase();
    
    const users = await seedUsers();
    const products = await seedProducts();
    
    await seedReviews(users, products);
    await seedOrders(users, products);
    await seedCarts(users, products);
    await seedWishlists(users, products);
    await seedBlogPosts(users);
    await seedCoupons();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Seeded Data Summary:');
    console.log(`👥 Users: ${users.length}`);
    console.log(`🍯 Products: ${products.length}`);
    console.log('⭐ Reviews: 8');
    console.log('📦 Orders: 4');
    console.log('🛒 Carts: 2');
    console.log('❤️  Wishlists: 3');
    console.log('📝 Blog Posts: 4');
    console.log('🎫 Coupons: 5');
    
    console.log('\n🔑 Test Credentials:');
    console.log('Admin: admin@goldenhive.com / admin123');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };