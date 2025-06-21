**AquaNest 💧**

AquaNest is a full-stack water delivery platform that allows users to browse, order, and track water deliveries, while also offering an admin interface for managing products and orders.

**🔧 Tech Stack**

_**Frontend**_
- React.js + TypeScript
- Tailwind CSS
- Framer Motion
- React Router

_**Backend**_
- Node.js
- Express.js
- MongoDB + Mongoose

**📁 Project Structure**

AquaNest/
├── backend/
│   ├── models/                # Mongoose models (User, Order, Product)
│   ├── routes/                # Express API routes
│   ├── middleware/            # Custom middleware (e.g., isAdmin)
│   ├── config.js              # MongoDB connection config
│   └── index.js               # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Footer)
│   │   ├── pages/             # Main pages (Home, Products, Login, etc.)
│   │   ├── App.tsx            # Routing setup
│   │   └── config.tsx         # Frontend API config
│   └── main.tsx               # React app entry

**🔐 Features**

- User authentication (Login/Sign Up)
- Product browsing and filtering
- Order placement and progress tracking
- Admin panel for order status and product management
- Profile-based order history

**🚀 Getting Started**

Backend Setup
    cd backend
    npm install
    npm run dev

Frontend Setup
    cd frontend
    npm install
    npm run dev

Make sure MongoDB is running and BACK_END_LINK is properly set in your config.ts.

**🛠️ API Routes Overview**

| Route                      | Method | Description                     |
|---------------------------|--------|---------------------------------|
| /api/users/:id            | GET    | Get user by ID                  |
| /api/orders/user/:id      | GET    | Get all orders for user         |
| /api/orders/:id/status    | PUT    | Update order status (admin)     |
| /api/products/            | GET    | Fetch all products              |

**📸 Screenshots**

> Add screenshots of your homepage, order tracking, and admin dashboard here for better presentation.

**📜 License**

MIT License. Feel free to use and modify for learning or production use.

**🙌 Acknowledgements**

- React & TypeScript Docs
- Tailwind CSS
- MongoDB + Mongoose
- Framer Motion
