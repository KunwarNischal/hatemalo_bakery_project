# HateMalo Bakery - Frontend Documentation

## Project Overview

HateMalo Bakery is a modern, full-featured e-commerce web application for an artisan bakery. The frontend is built with React and Vite, providing a responsive, fast, and intuitive user interface for both customers and administrators.

---

## Technology Stack

### Core Technologies
- **React 19.2.4** - UI library for building interactive user interfaces
- **Vite 5.4.1** - Next-generation build tool for rapid development
- **React Router v7** - Client-side routing for multi-page navigation
- **TailwindCSS 4.2** - Utility-first CSS framework for styling
- **Axios 1.13.6** - HTTP client for API communication
- **React Hot Toast 2.6** - Toast notifications for user feedback

### UI Components & Icons
- **Lucide React 0.577** - Beautiful icon library with 1000+ icons

### Developer Tools
- **ESLint 9.39** - Code quality and consistency checking
- **Autoprefixer 10.4** - CSS vendor prefix handling

---

## Project Structure

```
client/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React DOM entry point
│   ├── App.css                # Global application styles
│   ├── index.css              # Base styles
│   │
│   ├── components/            # Reusable UI components
│   │   ├── admin/             # Admin-specific components
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── CategoryModal.jsx
│   │   │   └── OrdersManagement.jsx
│   │   ├── bakery/            # Bakery home page components
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── CategoryQuickLinks.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── common/            # Shared components
│   │   │   └── DeleteModal.jsx
│   │   └── layout/            # Layout components
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       ├── AuthModal.jsx
│   │       └── CartDrawer.jsx
│   │
│   ├── pages/                 # Page components
│   │   ├── Home.jsx           # Landing page
│   │   ├── Menu.jsx           # Product menu/catalog
│   │   ├── ProductDetails.jsx # Individual product details
│   │   ├── Checkout.jsx       # Shopping cart checkout
│   │   ├── Contact.jsx        # Contact form
│   │   ├── Story.jsx          # About bakery
│   │   ├── MyOrders.jsx       # Customer order history
│   │   ├── admin/             # Admin pages
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ProductsManagement.jsx
│   │   │   ├── OrdersManagement.jsx
│   │   │   ├── CategoriesManagement.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   └── EditProduct.jsx
│   │   └── client/            # Customer pages
│   │       ├── CustomerLogin.jsx
│   │       └── CustomerRegister.jsx
│   │
│   ├── hooks/                 # Custom React hooks (8 total)
│   │   ├── useForm.js         # Form state management
│   │   ├── useFormValidation.js
│   │   ├── useFetchData.js    # Data fetching with error handling
│   │   ├── useCart.js         # Shopping cart operations
│   │   ├── useAuthCheck.js    # Authentication verification
│   │   ├── useSearchAndFilter.js
│   │   ├── useLocalStorage.js # Local storage wrapper
│   │   └── useApiCall.js      # Generic API call handler
│   │
│   ├── context/               # React Context for state management
│   │   └── CartContext.jsx    # Global cart state
│   │
│   ├── routes/                # Route configuration
│   │   └── AppRoutes.jsx      # All application routes
│   │
│   ├── services/              # API service layer
│   │   ├── api.js             # Axios instance & interceptors
│   │   ├── authService.js     # Authentication API calls
│   │   ├── productService.js  # Product API calls
│   │   ├── orderService.js    # Order API calls
│   │
│   ├── constants/             # Application constants
│   │   ├── categoryIcons.js   # Category icon mappings
│   │   └── orderStatus.js     # Order status options
│   │
│   ├── assets/                # Static assets
│   │   ├── data.js            # Mock/static data
│   │   └── bakery/            # Bakery images and media
│   │
│   │
│   └── layout/                # Layout components
│       └── AuthModal.jsx
│
├── public/                    # Static public assets
│   ├── logo.png
│   └── assets/

├── index.html                 # HTML entry point
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── package.json              # Dependencies & scripts
```

---

## Key Features

### 1. **Authentication System**
- Dual authentication: Customer & Admin roles
- JWT token-based authentication
- Multi-tab session support (separate tokens for each role)
- Secure token storage in localStorage
- Route protection based on user role

### 2. **Product Management**
- Browse bakery products with images
- Search and filter products by category
- Detailed product information pages
- "You Might Also Enjoy" recommendation section
- Smart product filtering (same category → featured → other)
- Category-based organization

### 3. **Shopping Cart**
- Add/remove products to cart
- Adjust product quantities
- Cart persists across sessions via Context API
- Real-time total calculation
- Visual cart indicator in navbar

### 4. **Checkout & Ordering**
- Complete checkout form with validation
- Customer details capture (name, email, phone, address)
- Optional delivery notes
- Multiple payment method options (Cash on Delivery)
- Order confirmation
- Email validation
- Address validation

### 5. **Admin Dashboard**
- Complete order management system
- Real-time order status updates
- View customer notes for each order
- Product management (create, edit, delete)
- Category management (create, edit, delete)
- Product image upload via Multer
- Order analytics
- Search and filter capabilities
- Expandable order details view

### 6. **Customer Features**
- Customer login and registration
- View order history (My Orders)
- Order tracking with status updates
- Contact form
- About/Story page
- Product recommendations
- Testimonials section

### 7. **Admin Features**
- Secure admin login
- Dashboard overview
- Products Management:
  - Add new products with images
  - Edit existing products
  - Delete products
  - Category assignment
  - Price management
- Orders Management:
  - Real-time order updates
  - View detailed order information
  - Update order status
  - View customer notes
  - Delete orders
- Categories Management:
  - CRUD operations
  - Quick category management

---

## Custom Hooks (Code Reusability)

### 1. **useForm**
```javascript
// Manages form state and submission
const form = useForm({
  initialValues: { name: '', email: '' },
  onSubmit: handleSubmit,
  validations: validationRules
});
```

### 2. **useFormValidation**
```javascript
// Handles form field validation
const { errors, touched, handleBlur } = useFormValidation({
  email: 'required|email',
  name: 'required|minLength:3'
});
```

### 3. **useFetchData**
```javascript
// Fetches data with loading, error, and refetch states
const { data, loading, error, refetch } = useFetchData(
  () => api.get('/products'),
  [], // dependencies
  (error) => toast.error(error)
);
```

### 4. **useCart**
```javascript
// Access global cart context
const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
```

### 5. **useAuthCheck**
```javascript
// Verify authentication and redirect if unauthorized
useAuthCheck('customer', { redirectTo: '/login' });
```

### 6. **useSearchAndFilter**
```javascript
// Search and filter data within a list
const { searchTerm, setSearchTerm, filteredItems } = useSearchAndFilter(
  items,
  (item, search) => item.name.toLowerCase().includes(search)
);
```

### 7. **useLocalStorage**
```javascript
// Persistent state management with localStorage
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### 8. **useApiCall**
```javascript
// Generic API call handler with success/error callbacks
const { execute, loading } = useApiCall(apiFunction, {
  onSuccess: () => toast.success('Success'),
  onError: (error) => toast.error(error.message)
});
```

---

## Authentication & Token Management

### Multi-Tab Support
The application supports simultaneous admin and customer logins in different tabs:

- **customerInfo** - Customer authentication token
- **userInfo** - Admin authentication token

### Smart Token Routing
API interceptor in `api.js` automatically routes requests to the correct token:
```javascript
// Checks request path and uses appropriate token
if (path.includes('/admin') || path.includes('/dashboard')) {
  // Use admin token
} else {
  // Use customer token
}
```

### Session Persistence
- Tokens stored in localStorage
- Auto-verification on page refresh
- Automatic logout on token expiration

---

## State Management

### 1. **Context API (Global State)**
- **CartContext** - Shopping cart items and operations

### 2. **Local Component State**
- Form inputs
- UI visibility toggles
- Expanded/collapsed states

### 3. **Custom Hooks State**
- Form validation errors
- API loading states
- Search/filter states

---

## API Integration

### Axios Configuration
```javascript
// api.js - Central API configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Smart token interceptor
api.interceptors.request.use((config) => {
  // Select correct token based on request path
  // Add authorization header
});
```

### API Service Layer
- **authService.js** - Login, Register, Logout
- **productService.js** - Product CRUD operations
- **orderService.js** - Order creation and status updates

---

## UI/UX Features

### 1. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grid layouts
- Touch-friendly buttons

### 2. **Toast Notifications**
- Success messages
- Error alerts
- Loading indicators
- Custom styling

### 3. **Form Validation**
- Real-time validation
- Field-level error messages
- Email validation
- Required field checking
- Character length validation

### 4. **User Feedback**
- Loading states
- Empty state messages
- Hover effects
- Smooth transitions
- Icon-based indicators

### 5. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Color contrast compliance
- Focus management

---

## TailwindCSS Styling

### Color Scheme
- **Primary**: `light-brown` and `dark-brown`
- **Accent**: `cream` for backgrounds
- **Status Colors**: Green (success), Red (error), Orange (pending)

### Custom Classes
- `.font-display` - Display font for headings
- `.text-primary` - Primary text color
- Custom color palette defined in tailwind config

---

## Performance Optimizations

1. **Code Splitting**
   - Page-level code splitting with React Router
   - Lazy component loading

2. **Image Optimization**
   - Product image optimization
   - Placeholder images for failed loads
   - Responsive image sizing

3. **Caching**
   - API response caching with custom hooks
   - LocalStorage for persistent cache

4. **Bundle Optimization**
   - Vite's optimized build process
   - Tree-shaking unused code
   - Minification and compression

---

## Form Handling

### Checkout Form
- Customer name validation
- Email validation (regex pattern)
- Phone number validation
- Address validation
- Optional notes field
- Real-time error messages

### Product Management Forms
- Product name, description, price
- Category selection
- Image upload with preview
- Validation feedback
- Cancel/Submit options

### Authentication Forms
- Email validation
- Password requirements
- Form submission handling
- Error state management

---

## Error Handling

1. **API Errors**
   - Centralized error handling in axios interceptor
   - User-friendly error messages
   - Automatic retries for certain errors

2. **Validation Errors**
   - Field-level error display
   - Validation on blur and submit
   - Clear error messages

3. **Network Errors**
   - Offline detection
   - Retry mechanisms
   - Error notifications

---

## Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
npm run preview  # Preview production build
```

### Development Mode
- Hot Module Replacement (HMR)
- Fast refresh for React changes
- Detailed error messages
- Source maps for debugging

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Security Features

1. **Authentication**
   - JWT token-based authentication
   - Secure token storage
   - Token validation on protected routes

2. **Authorization**
   - Role-based access control (Admin/Customer)
   - Route protection middleware
   - Context-based permission checking

3. **Data Protection**
   - CORS enabled for secure API calls
   - Input validation on all forms
   - XSS protection via React's built-in escaping

---

## Testing & Debugging

### Available Developer Tools
- React Developer Tools browser extension
- Redux DevTools (if Redux added)
- Network tab in browser DevTools
- Console for debugging

### Console Logging
- Order submission logs
- Authentication state logs
- API request/response logs

---

## Future Enhancements

1. **Payment Integration**
   - Stripe or Razorpay integration
   - Multiple payment methods

2. **Advanced Features**
   - Order tracking map
   - Email notifications
   - SMS notifications
   - Loyalty program

3. **Performance**
   - Service Workers for offline support
   - Progressive Web App (PWA)
   - Advanced caching strategies

4. **Analytics**
   - User behavior tracking
   - Sales analytics dashboard
   - Product performance metrics

---

## Deployment

### Production Build
```bash
npm run build
# Creates optimized dist/ folder
```

### Hosting Options
- Vercel
- Netlify
- GitHub Pages
- Traditional web servers

### Environment Variables
- `VITE_API_URL` - Backend API endpoint

---

## Conclusion

The HateMalo Bakery frontend is a modern, feature-rich e-commerce solution built with React and contemporary web technologies. It demonstrates best practices in component architecture, state management, and user experience design, making it an excellent example for internship projects and production-grade applications.
