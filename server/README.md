# Golden Hive - Backend API

A complete Node.js backend API for the Golden Hive honey store e-commerce application built with Express.js and MongoDB.

## 🚀 Features

- **Complete Authentication System**: Registration, login, logout, password management
- **User Management**: Profile management, addresses, role-based access control
- **Product Management**: CRUD operations, search, filtering, categorization
- **Shopping Cart**: Add, update, remove items, persistent cart storage
- **Order Management**: Complete order processing, status tracking
- **Review System**: Product reviews and ratings
- **Wishlist**: Save favorite products
- **Blog Management**: Content management system for blog posts
- **Coupon System**: Discount codes with validation and usage tracking
- **Admin Dashboard**: User management, order tracking, analytics
- **Analytics**: Revenue analytics, product insights, dashboard statistics

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting
- **Environment**: dotenv

## 📁 Project Structure

```
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Route controllers
├── middleware/             # Custom middleware
├── models/                 # Mongoose schemas
├── routes/                 # Express routes
├── .env                    # Environment variables
├── server.js              # Application entry point
└── package.json           # Dependencies and scripts
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/golden_hive
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   Or for production:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user info

### Product Endpoints
- `GET /products` - Get all products (with filtering)
- `GET /products/:id` - Get single product
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Cart Endpoints
- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:productId` - Update cart item
- `DELETE /cart/items/:productId` - Remove item from cart
- `DELETE /cart` - Clear entire cart

### Order Endpoints
- `GET /orders` - Get user orders
- `GET /orders/:id` - Get single order
- `POST /orders` - Create new order
- `PUT /orders/:id/status` - Update order status (Admin only)

### Review Endpoints
- `GET /reviews/product/:productId` - Get product reviews
- `POST /reviews` - Create review
- `DELETE /reviews/:id` - Delete review (Admin only)

### Admin Endpoints
- `GET /admin/users` - Get all users
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/orders` - Get all orders
- `GET /admin/stats` - Get dashboard statistics
- `GET /admin/analytics/revenue` - Get revenue analytics
- `GET /admin/analytics/products` - Get product analytics

For complete API documentation, see the included `API_DOC.md` file.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevents brute force attacks
- **CORS Protection**: Cross-origin resource sharing configuration
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Comprehensive error handling and logging

## 🗄️ Database Schema

### Main Collections:
- **Users**: User accounts, profiles, and addresses
- **Products**: Product catalog with categories and inventory
- **Orders**: Order history and tracking
- **Reviews**: Product reviews and ratings
- **Carts**: Shopping cart persistence
- **Wishlists**: User wishlist items
- **BlogPosts**: Blog content management
- **Coupons**: Discount codes and promotions

## 🚀 Deployment

### Environment Configuration
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=your_frontend_domain
```

### MongoDB Setup
1. Create a MongoDB database (local or cloud)
2. Update the `MONGODB_URI` in your environment variables
3. The application will automatically create the required collections

## 🧪 Testing

The API includes comprehensive error handling and validation. You can test endpoints using:
- Postman
- curl commands
- Any REST client

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Golden Hive Backend API** - Built with ❤️ for e-commerce excellence