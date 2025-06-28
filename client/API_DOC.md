More actions
# Bee Dlight - Complete Backend API Documentation

This document outlines all the API endpoints required for the Bee Dlight honey store application based on the frontend codebase analysis.

## Table of Contents
1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Products](#products)
4. [Cart Management](#cart-management)
5. [Orders](#orders)
6. [Reviews](#reviews)
7. [Blog Management](#blog-management)
8. [Coupon Management](#coupon-management)
9. [Wishlist](#wishlist)
10. [Admin Dashboard](#admin-dashboard)
11. [Analytics & Statistics](#analytics--statistics)

---

## Authentication

### POST /auth/login
**Purpose**: User login
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "user"
  },
  "token": "string"
}
```
**Error Response**:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### POST /auth/register
**Purpose**: User registration
**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "user"
  },
  "token": "string"
}
```

### POST /auth/logout
**Purpose**: User logout
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
**Purpose**: Get current user info
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "user"
  }
}
```

---

## User Management

### GET /users/profile
**Purpose**: Get user profile
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "profile": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "createdAt": "string"
  }
}
```

### PUT /users/profile
**Purpose**: Update user profile
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string"
}
```
**Response**:
```json
{
  "success": true,
  "profile": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string"
  }
}
```

### GET /users/addresses
**Purpose**: Get user addresses
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "addresses": [
    {
      "id": "number",
      "type": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "zip": "string",
      "isDefault": "boolean"
    }
  ]
}
```

### POST /users/addresses
**Purpose**: Add new address
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "type": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "zip": "string"
}
```
**Response**:
```json
{
  "success": true,
  "address": {
    "id": "number",
    "type": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zip": "string",
    "isDefault": "boolean"
  }
}
```

### DELETE /users/addresses/:id
**Purpose**: Delete address
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

### PUT /users/password
**Purpose**: Change password
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Products

### GET /products
**Purpose**: Get all products with filtering
**Query Parameters**:
- `category`: string (optional)
- `search`: string (optional)
- `page`: number (optional, default: 1)
- `limit`: number (optional, default: 10)
- `sortBy`: "price" | "rating" | "name" (optional)
- `sortOrder`: "asc" | "desc" (optional)
**Response**:
```json
{
  "success": true,
  "products": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "originalPrice": "number",
      "image": "string",
      "rating": "number",
      "reviews": "number",
      "description": "string",
      "badge": "string",
      "category": "string",
      "stock": "number"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number"
  }
}
```

### GET /products/:id
**Purpose**: Get single product details
**Response**:
```json
{
  "success": true,
  "product": {
    "id": "number",
    "name": "string",
    "price": "number",
    "originalPrice": "number",
    "image": "string",
    "rating": "number",
    "reviews": "number",
    "description": "string",
    "badge": "string",
    "category": "string",
    "stock": "number"
  }
}
```

### POST /products (Admin Only)
**Purpose**: Create new product
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "name": "string",
  "price": "number",
  "originalPrice": "number",
  "image": "string",
  "description": "string",
  "badge": "string",
  "category": "string",
  "stock": "number"
}
```
**Response**:
```json
{
  "success": true,
  "product": {
    "id": "number",
    "name": "string",
    "price": "number",
    "originalPrice": "number",
    "image": "string",
    "rating": 0,
    "reviews": 0,
    "description": "string",
    "badge": "string",
    "category": "string",
    "stock": "number"
  }
}
```

### PUT /products/:id (Admin Only)
**Purpose**: Update product
**Headers**: Authorization: Bearer {token}
**Request Body**: Same as POST /products
**Response**: Same as POST /products

### DELETE /products/:id (Admin Only)
**Purpose**: Delete product
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Cart Management

### GET /cart
**Purpose**: Get user cart
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "cart": {
    "items": [
      {
        "id": "number",
        "name": "string",
        "price": "number",
        "image": "string",
        "quantity": "number",
        "size": "string"
      }
    ],
    "total": "number"
  }
}
```

### POST /cart/items
**Purpose**: Add item to cart
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "productId": "number",
  "quantity": "number",
  "size": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Item added to cart"
}
```

### PUT /cart/items/:productId
**Purpose**: Update cart item quantity
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "quantity": "number"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Cart updated"
}
```

### DELETE /cart/items/:productId
**Purpose**: Remove item from cart
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

### DELETE /cart
**Purpose**: Clear entire cart
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## Orders

### GET /orders
**Purpose**: Get user orders
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "userId": "string",
      "items": [
        {
          "id": "number",
          "name": "string",
          "price": "number",
          "quantity": "number"
        }
      ],
      "total": "number",
      "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled",
      "createdAt": "string",
      "shippingAddress": {
        "name": "string",
        "email": "string",
        "address": "string",
        "city": "string",
        "zipCode": "string"
      }
    }
  ]
}
```

### GET /orders/:id
**Purpose**: Get single order details
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "order": {
    "id": "string",
    "userId": "string",
    "items": [
      {
        "id": "number",
        "name": "string",
        "price": "number",
        "quantity": "number"
      }
    ],
    "total": "number",
    "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled",
    "createdAt": "string",
    "shippingAddress": {
      "name": "string",
      "email": "string",
      "address": "string",
      "city": "string",
      "zipCode": "string"
    }
  }
}
```

### POST /orders
**Purpose**: Create new order (checkout)
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "items": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "quantity": "number"
    }
  ],
  "total": "number",
  "shippingAddress": {
    "name": "string",
    "email": "string",
    "address": "string",
    "city": "string",
    "zipCode": "string"
  },
  "couponCode": "string"
}
```
**Response**:
```json
{
  "success": true,
  "order": {
    "id": "string",
    "status": "pending",
    "total": "number"
  }
}
```

### PUT /orders/:id/status (Admin Only)
**Purpose**: Update order status
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Order status updated"
}
```

---

## Reviews

### GET /reviews/product/:productId
**Purpose**: Get reviews for a product
**Response**:
```json
{
  "success": true,
  "reviews": [
    {
      "id": "string",
      "productId": "number",
      "userId": "string",
      "userName": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "string"
    }
  ],
  "averageRating": "number",
  "totalReviews": "number"
}
```

### POST /reviews
**Purpose**: Add product review
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "productId": "number",
  "rating": "number",
  "comment": "string"
}
```
**Response**:
```json
{
  "success": true,
  "review": {
    "id": "string",
    "productId": "number",
    "userId": "string",
    "userName": "string",
    "rating": "number",
    "comment": "string",
    "createdAt": "string"
  }
}
```

### DELETE /reviews/:id (Admin Only)
**Purpose**: Delete review
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

### GET /reviews (Admin Only)
**Purpose**: Get all reviews for admin
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "reviews": [
    {
      "id": "string",
      "productId": "number",
      "productName": "string",
      "userId": "string",
      "userName": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "string"
    }
  ]
}
```

---

## Blog Management

### GET /blog/posts
**Purpose**: Get published blog posts
**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "excerpt": "string",
      "image": "string",
      "author": "string",
      "createdAt": "string",
      "published": true
    }
  ]
}
```

### GET /blog/posts/:id
**Purpose**: Get single blog post
**Response**:
```json
{
  "success": true,
  "post": {
    "id": "string",
    "title": "string",
    "content": "string",
    "excerpt": "string",
    "image": "string",
    "author": "string",
    "createdAt": "string",
    "published": "boolean"
  }
}
```

### POST /blog/posts (Admin Only)
**Purpose**: Create new blog post
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "image": "string",
  "published": "boolean"
}
```
**Response**:
```json
{
  "success": true,
  "post": {
    "id": "string",
    "title": "string",
    "content": "string",
    "excerpt": "string",
    "image": "string",
    "author": "string",
    "createdAt": "string",
    "published": "boolean"
  }
}
```

### PUT /blog/posts/:id (Admin Only)
**Purpose**: Update blog post
**Headers**: Authorization: Bearer {token}
**Request Body**: Same as POST /blog/posts
**Response**: Same as POST /blog/posts

### DELETE /blog/posts/:id (Admin Only)
**Purpose**: Delete blog post
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

### GET /blog/posts/admin (Admin Only)
**Purpose**: Get all blog posts for admin (including unpublished)
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "posts": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "excerpt": "string",
      "image": "string",
      "author": "string",
      "createdAt": "string",
      "published": "boolean"
    }
  ]
}
```

---

## Coupon Management

### GET /coupons (Admin Only)
**Purpose**: Get all coupons
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "coupons": [
    {
      "id": "string",
      "code": "string",
      "description": "string",
      "discountType": "percentage" | "fixed",
      "discountValue": "number",
      "minOrderAmount": "number",
      "maxUses": "number",
      "currentUses": "number",
      "validFrom": "string",
      "validTo": "string",
      "isActive": "boolean"
    }
  ]
}
```

### POST /coupons (Admin Only)
**Purpose**: Create new coupon
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "code": "string",
  "description": "string",
  "discountType": "percentage" | "fixed",
  "discountValue": "number",
  "minOrderAmount": "number",
  "maxUses": "number",
  "validFrom": "string",
  "validTo": "string",
  "isActive": "boolean"
}
```
**Response**:
```json
{
  "success": true,
  "coupon": {
    "id": "string",
    "code": "string",
    "description": "string",
    "discountType": "percentage" | "fixed",
    "discountValue": "number",
    "minOrderAmount": "number",
    "maxUses": "number",
    "currentUses": 0,
    "validFrom": "string",
    "validTo": "string",
    "isActive": "boolean"
  }
}
```

### PUT /coupons/:id (Admin Only)
**Purpose**: Update coupon
**Headers**: Authorization: Bearer {token}
**Request Body**: Same as POST /coupons
**Response**: Same as POST /coupons

### DELETE /coupons/:id (Admin Only)
**Purpose**: Delete coupon
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Coupon deleted successfully"
}
```

### POST /coupons/validate
**Purpose**: Validate coupon code
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "code": "string",
  "orderAmount": "number"
}
```
**Response**:
```json
{
  "success": true,
  "valid": "boolean",
  "discount": "number",
  "message": "string"
}
```

### POST /coupons/use
**Purpose**: Use coupon (increment usage count)
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "code": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Coupon used successfully"
}
```

---

## Wishlist

### GET /wishlist
**Purpose**: Get user wishlist
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "items": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "image": "string"
    }
  ]
}
```

### POST /wishlist/items
**Purpose**: Add item to wishlist
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "productId": "number"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Item added to wishlist"
}
```

### DELETE /wishlist/items/:productId
**Purpose**: Remove item from wishlist
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Item removed from wishlist"
}
```

### DELETE /wishlist
**Purpose**: Clear entire wishlist
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "Wishlist cleared"
}
```

---

## Admin Dashboard

### GET /admin/users (Admin Only)
**Purpose**: Get all users for admin
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "admin" | "user",
      "createdAt": "string",
      "lastLogin": "string",
      "isActive": "boolean"
    }
  ]
}
```

### PUT /admin/users/:id (Admin Only)
**Purpose**: Update user role/status
**Headers**: Authorization: Bearer {token}
**Request Body**:
```json
{
  "role": "admin" | "user",
  "isActive": "boolean"
}
```
**Response**:
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

### DELETE /admin/users/:id (Admin Only)
**Purpose**: Delete user
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### GET /admin/orders (Admin Only)
**Purpose**: Get all orders for admin
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "userId": "string",
      "userName": "string",
      "userEmail": "string",
      "items": [
        {
          "id": "number",
          "name": "string",
          "price": "number",
          "quantity": "number"
        }
      ],
      "total": "number",
      "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled",
      "createdAt": "string",
      "shippingAddress": {
        "name": "string",
        "email": "string",
        "address": "string",
        "city": "string",
        "zipCode": "string"
      }
    }
  ]
}
```

---

## Analytics & Statistics

### GET /admin/stats (Admin Only)
**Purpose**: Get dashboard statistics
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "stats": {
    "totalRevenue": "number",
    "totalOrders": "number",
    "totalProducts": "number",
    "totalUsers": "number",
    "recentOrders": [
      {
        "id": "string",
        "userName": "string",
        "total": "number",
        "status": "string",
        "createdAt": "string"
      }
    ],
    "popularProducts": [
      {
        "id": "number",
        "name": "string",
        "totalSold": "number",
        "revenue": "number"
      }
    ],
    "monthlyRevenue": [
      {
        "month": "string",
        "revenue": "number",
        "orders": "number"
      }
    ]
  }
}
```

### GET /admin/analytics/revenue (Admin Only)
**Purpose**: Get revenue analytics
**Headers**: Authorization: Bearer {token}
**Query Parameters**:
- `period`: "week" | "month" | "year"
- `startDate`: string (optional)
- `endDate`: string (optional)
**Response**:
```json
{
  "success": true,
  "analytics": {
    "totalRevenue": "number",
    "periodRevenue": "number",
    "percentageChange": "number",
    "dailyRevenue": [
      {
        "date": "string",
        "revenue": "number"
      }
    ]
  }
}
```

### GET /admin/analytics/products (Admin Only)
**Purpose**: Get product analytics
**Headers**: Authorization: Bearer {token}
**Response**:
```json
{
  "success": true,
  "analytics": {
    "topSellingProducts": [
      {
        "id": "number",
        "name": "string",
        "totalSold": "number",
        "revenue": "number"
      }
    ],
    "lowStockProducts": [
      {
        "id": "number",
        "name": "string",
        "currentStock": "number"
      }
    ],
    "categoryDistribution": [
      {
        "category": "string",
        "count": "number",
        "percentage": "number"
      }
    ]
  }
}
```

---

## Error Handling

All endpoints should return consistent error responses:

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

### Common HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 409: Conflict (duplicate data)
- 500: Internal Server Error

---

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "string",
  "email": "string",
  "role": "admin" | "user",
  "iat": "number",
  "exp": "number"
}
```

### Admin-Only Endpoints
All admin endpoints require:
1. Valid JWT token
2. User role must be "admin"

### User Authentication Required
These endpoints require valid JWT token:
- All `/cart/*` endpoints
- All `/orders/*` endpoints (except admin routes)
- All `/wishlist/*` endpoints
- All `/users/*` endpoints
- `/reviews` POST endpoint
- All `/admin/*` endpoints

---

## Database Schema Considerations

Based on the frontend requirements, you'll need these main entities:

### Users
- id, name, email, password_hash, role, phone, created_at, updated_at

### Products
- id, name, description, price, original_price, image, category, stock, created_at, updated_at

### Orders
- id, user_id, total, status, shipping_address (JSON), created_at, updated_at

### Order_Items
- id, order_id, product_id, quantity, price_at_time

### Reviews
- id, product_id, user_id, rating, comment, created_at

### Cart_Items
- id, user_id, product_id, quantity, size

### Wishlist_Items
- id, user_id, product_id

### Addresses
- id, user_id, type, address, city, state, zip, is_default

### Blog_Posts
- id, title, content, excerpt, image, author, published, created_at, updated_at

### Coupons
- id, code, description, discount_type, discount_value, min_order_amount, max_uses, current_uses, valid_from, valid_to, is_active

This documentation covers all the API endpoints needed based on your frontend codebase. Each endpoint includes the exact request/response format that your frontend expects.