# Airventory Backend API

This is the backend API for the Airbnb Inventory Management App (Airventory). It provides endpoints for managing properties, rooms, inventory items, maintenance tasks, and user roles.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Host, Employee, Admin)
  - Refresh token mechanism

- **Property Management**
  - Create, read, update, and delete properties
  - Property statistics and reporting

- **Room Management**
  - Organize properties into rooms
  - Track room-specific inventory

- **Inventory Management**
  - Track inventory items with status (OK, Missing, Damaged, Needs Attention)
  - Bulk operations for efficient inventory checks
  - Historical tracking of inventory status changes

- **Maintenance Tasks**
  - Create and assign maintenance tasks
  - Track task status and resolution
  - Link tasks to specific inventory items

- **Audit Logging**
  - Comprehensive audit trail of all system actions
  - User activity tracking for accountability

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Winston** - Logging

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

### Running the Server

Development mode:
```
npm run dev
```

Production build:
```
npm run build
npm start
```

### API Documentation

The API follows RESTful conventions with the following main endpoints:

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Authenticate user
  - `POST /api/auth/refresh` - Refresh access token
  - `GET /api/auth/profile` - Get user profile
  - `PUT /api/auth/profile` - Update user profile

- **Users**
  - `GET /api/users` - Get all users (Admin only)
  - `GET /api/users/:id` - Get user by ID (Admin only)
  - `POST /api/users` - Create a new user (Admin only)
  - `PUT /api/users/:id` - Update user (Admin only)
  - `DELETE /api/users/:id` - Delete user (Admin only)

- **Properties**
  - `GET /api/properties` - Get all properties
  - `GET /api/properties/:id` - Get property by ID
  - `POST /api/properties` - Create a new property
  - `PUT /api/properties/:id` - Update property
  - `DELETE /api/properties/:id` - Delete property
  - `GET /api/properties/:id/stats` - Get property statistics

- **Rooms**
  - `GET /api/properties/:propertyId/rooms` - Get all rooms for a property
  - `GET /api/rooms/:id` - Get room by ID
  - `POST /api/properties/:propertyId/rooms` - Create a new room
  - `PUT /api/rooms/:id` - Update room
  - `DELETE /api/rooms/:id` - Delete room

- **Inventory**
  - `GET /api/properties/:propertyId/inventory` - Get all inventory items for a property
  - `GET /api/rooms/:roomId/inventory` - Get all inventory items for a room
  - `GET /api/inventory/:id` - Get inventory item by ID
  - `POST /api/rooms/:roomId/inventory` - Create a new inventory item
  - `PUT /api/inventory/:id` - Update inventory item
  - `DELETE /api/inventory/:id` - Delete inventory item
  - `POST /api/rooms/:roomId/inventory/bulk` - Bulk create inventory items
  - `PUT /api/rooms/:roomId/inventory/bulk-status` - Bulk update inventory status

- **Maintenance**
  - `GET /api/properties/:propertyId/maintenance` - Get all maintenance tasks for a property
  - `GET /api/maintenance/:id` - Get maintenance task by ID
  - `POST /api/properties/:propertyId/maintenance` - Create a new maintenance task
  - `PUT /api/maintenance/:id` - Update maintenance task
  - `DELETE /api/maintenance/:id` - Delete maintenance task

## Testing

Run tests:
```
npm test
```

## License

This project is proprietary and confidential.

