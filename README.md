# 🏠 Airbnb Clone — Travel Listing & Booking Platform

A full-stack travel listing and booking platform inspired by Airbnb, where users can create, browse, edit, and delete destination listings with image uploads, while also leaving reviews, ratings, and booking trips.

---

## 🚀 Live Demo Deployment
- **Live Public URL**: [https://miller-signatures-hometown-killing.trycloudflare.com](https://miller-signatures-hometown-killing.trycloudflare.com)
- **Local URL**: `http://localhost:8080`

### 🔑 Demo Host Credentials
- **Username**: `demo_user`
- **Password**: `password123`

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Node.js & Express.js
- **Database**: MongoDB & Mongoose (with automated fallback to `mongodb-memory-server` and seed data)
- **View Engine**: EJS with `ejs-mate` templating
- **Authentication**: Passport.js (`passport-local`, `passport-local-mongoose`) with session persistence
- **File & Media Storage**: Cloudinary integration (`multer`, `multer-storage-cloudinary`) with local disk fallback
- **Interactive Maps**: Leaflet.js with OpenStreetMap (no paid API key required)
- **Validation**: Joi schema validation
- **Styling**: Bootstrap 5, FontAwesome 6, and custom Airbnb CSS design

---

## ✨ Key Features

1. **Authentication & Authorization**:
   - User Registration, Login, and Logout
   - Ownership controls: Only listing owners can edit/delete listings
   - Review author controls: Only review authors can remove their reviews
   - Redirect to previous page after login

2. **Listings Management (CRUD)**:
   - Category filtering (Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic, Beachfront, Luxury)
   - Real-time destination search (by name, city, country, or category)
   - Total price with 18% GST tax toggle switch
   - Responsive photo card grid with hover zoom effects

3. **Stay Details & Booking System**:
   - High-resolution cover photo and host information
   - Dynamic reservation widget: check-in, check-out, guest selector, and real-time price calculator (nights x rate + fees + taxes)
   - "My Trips & Bookings" page with reservation status and cancellation

4. **Reviews & Ratings**:
   - 5-star rating system with starability radio selector
   - Verified guest review cards and average rating calculations

5. **Interactive Mapping**:
   - Leaflet map pin with custom Airbnb house badge showing location and neighborhood radius

---

## 🏁 Quickstart Guide

1. Clone or open the project directory:
   ```bash
   npm install
   ```

2. (Optional) Configure `.env`:
   ```env
   PORT=8080
   SECRET=your_secret_key
   # Optional: MongoDB Atlas URI (if omitted, runs built-in database automatically)
   MONGODB_URI=
   # Optional: Cloudinary keys (if omitted, falls back to direct uploads/URLs)
   CLOUD_NAME=
   CLOUD_API_KEY=
   CLOUD_API_SECRET=
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open `http://localhost:8080` in your browser.
