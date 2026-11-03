# 🌕 Fullmoon Multicuisine Family Restaurant

A modern, production-ready, full-stack website built for **Fullmoon Multicuisine Family Restaurant** in Old Alwal, Secunderabad, Telangana.

Featuring online food ordering, Razorpay UPI/card payments, a responsive menu with filters, Google Maps verified reviews and location integration, an Instagram showcase, and a role-protected **Restaurant Owner Command Center** powered by Firebase Authentication and Firestore.

---

## 🎨 Design Decisions & Color Palette

### The Creative Direction
The name **"Fullmoon"** evokes a warm, glowing night-time celestial atmosphere. In Alwal, the restaurant serves both as an intimate air-conditioned family dining room and a relaxed restobar lounge. To reflect this duality, the design adopts a **"Moonlit Gastronomy"** luxury theme:
- Deep night sky backdrops that let food photography shine vividly.
- Warm amber and golden accents reminiscent of glowing tandoor embers and the moon.
- High-contrast, legible typography pairing an elegant serif for titles (*Playfair Display*) with a crisp modern sans-serif (*Plus Jakarta Sans*) for UI components and reading comfort.

### Color Palette Breakdown
| Role | Color Hex / Tailwind | Purpose & Emotional Tone |
| :--- | :--- | :--- |
| **Primary / Moon Gold** | `#F59E0B` (`brand-500`) | Warm glowing highlights, active states, buttons, star ratings |
| **Secondary / Amber Glow**| `#D97706` (`brand-600`) | Rich tandoor warmth, hover borders, gradients |
| **Accent / Emerald Green**| `#10B981` (`emerald-500`)| Authentic Veg indicator (FSSAI standard), open status, success badges |
| **Accent / Coral Red** | `#EF4444` (`red-500`) | Authentic Non-Veg indicator, spicy dish markers, delete alerts |
| **Background / Canvas** | `#070A12` (`night-950`) | Deep obsidian canvas; reduces glare, battery-friendly on OLED |
| **Card Surface** | `#111827` (`night-850`) | Elevated card panels with subtle golden borders and soft shadows |
| **Primary Text** | `#F8FAFC` (`slate-100`) | Crisp, high-contrast readable copy |
| **Muted Text** | `#94A3B8` (`slate-400`) | Subtle metadata, timestamps, secondary captions |

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/) (Multi-page SPA with code splitting & lazy routes)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [lucide-react](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend / Database / Auth**: [Firebase](https://firebase.google.com/) (Authentication + Cloud Firestore)
- **Payment Gateway**: [Razorpay](https://razorpay.com/) (Test mode UPI, Cards, NetBanking) + Pay on Delivery / Pay at Restaurant
- **Local Fallback**: Zero-crash developer mode that simulates orders, payments, and dashboard data when Firebase keys are not yet configured.

---

## 📂 Project Structure

```text
fullmoon-restaurant/
├── public/
│   ├── moon-icon.svg          # Custom SVG Favicon with glowing moon
│   ├── robots.txt             # SEO crawler instructions
│   └── sitemap.xml            # Search engine sitemap
├── src/
│   ├── assets/                # Static media assets
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky navbar with logo, drawer & cart badge
│   │   ├── Footer.jsx         # Verified address, hours, links & socials
│   │   ├── DishCard.jsx       # Reusable dish card with veg/non-veg & cart stepper
│   │   ├── LightboxModal.jsx  # High-res image modal with arrow keys
│   │   ├── StickyMobileBar.jsx# Mobile bottom bar (Call, WhatsApp, View Cart)
│   │   ├── FloatingWhatsApp.jsx# Floating WhatsApp chat button with prefilled prompt
│   │   └── ProtectedRoute.jsx # Role-based owner gatekeeper for /owner/*
│   ├── config/
│   │   └── restaurant.js      # SINGLE SOURCE OF TRUTH for address, phones, hours & TODOs
│   ├── context/
│   │   ├── CartContext.jsx    # Cart state, quantities, taxes & local persistence
│   │   └── AuthContext.jsx    # Owner authentication & session management
│   ├── data/
│   │   ├── menu.js            # Categorized menu items with prices & descriptions
│   │   ├── reviews.js         # Genuine reviews extracted from Google Maps & Justdial
│   │   └── instagram.js       # Instagram showcase feed with likes & captions
│   ├── pages/
│   │   ├── HomePage.jsx       # Hero, About, Specialties, Gallery, Reviews, Instagram, CTA
│   │   ├── MenuPage.jsx       # Search bar, category filters, veg/non-veg toggle, dishes grid
│   │   ├── OrderPage.jsx      # Cart review, delivery form, Razorpay/COD & confirmation
│   │   ├── LocationPage.jsx   # Embedded Google Map, directions, hours table & landmark info
│   │   ├── ContactPage.jsx    # Contact form saved to Firestore, phone links, WhatsApp
│   │   ├── OwnerLoginPage.jsx # Secure owner login with one-click demo access
│   │   ├── OwnerDashboardPage.jsx# Live orders, status updater, payments, messages & CSV export
│   │   └── NotFoundPage.jsx   # Friendly 404 page
│   ├── services/
│   │   ├── firebase.js        # Firestore & Auth service with local fallback
│   │   └── paymentService.js  # Razorpay integration & payment handler
│   ├── App.jsx                # Router configuration & lazy route suspense
│   ├── index.css              # Custom scrollbars, glassmorphism & Tailwind styles
│   └── main.jsx               # Application entry point
├── .env.example               # Environment variables template
├── firestore.rules            # Firestore security rules protecting owner data
├── index.html                 # SEO Meta, OpenGraph tags & Schema.org JSON-LD
├── netlify.toml               # Netlify SPA redirect rule
├── vercel.json                # Vercel SPA rewrite rule
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 How to Install and Run

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** and **npm** installed.

### 2. Clone and Install
```bash
git clone https://github.com/your-username/fullmoon-restaurant.git
cd fullmoon-restaurant
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This generates the optimized production build in the `dist/` directory.

---

## 🔐 Firebase & Owner Setup Guide

### 1. Create a Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Name it (e.g., `fullmoon-restaurant`).
3. Enable **Authentication**:
   - Go to **Build > Authentication > Sign-in method**.
   - Enable **Email/Password**.
   - In the **Users** tab, click **Add user** and create the owner credentials:
     - **Email**: `owner@fullmoonrestaurant.com` (or your chosen email)
     - **Password**: Create a secure password.
4. Enable **Cloud Firestore**:
   - Go to **Build > Firestore Database > Create Database**.
   - Start in **Production mode**.
   - Copy the rules from [`firestore.rules`](./firestore.rules) into the Firestore **Rules** tab and click **Publish**.
5. Register a Web App:
   - In Project Settings, click the `</>` (Web) icon to add an app.
   - Copy the `firebaseConfig` keys into your `.env` file.

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate the values:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=fullmoon-restaurant.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fullmoon-restaurant
VITE_FIREBASE_STORAGE_BUCKET=fullmoon-restaurant.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:...

# Must match the email created in Firebase Authentication
VITE_OWNER_EMAIL=owner@fullmoonrestaurant.com

# Razorpay Test Key (Get from https://dashboard.razorpay.com/#/app/keys)
VITE_RAZORPAY_KEY_ID=rzp_test_placeholder_key

# Set to false once real Firebase keys are filled
VITE_ENABLE_MOCK_BACKEND=false
```

---

## 💳 Payment Gateway Integration (Razorpay)

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Switch to **Test Mode**.
3. Navigate to **Account & Settings > API Keys** and generate a Key ID (e.g. `rzp_test_XXXXXXXXXXXXXX`).
4. Paste it as `VITE_RAZORPAY_KEY_ID` in your `.env`.
5. The checkout modal will automatically launch when a customer selects Razorpay at checkout!
6. *Note*: In development or demo mode, if the key is empty or placeholder, the payment service safely simulates a successful test payment so testing is never blocked.

---

## 📝 How to Update Restaurant Info, Menu & Reviews

All configurable data is isolated in central data files:

1. **Restaurant Phone, Address, Hours, Socials**:
   - File: [`src/config/restaurant.js`](./src/config/restaurant.js)
   - Edit phone numbers, coordinates, embed map URL, opening hours, or delivery fees.
2. **Food Menu Items**:
   - File: [`src/data/menu.js`](./src/data/menu.js)
   - Add, edit, or remove dishes, prices, categories, descriptions, or veg/non-veg flags.
3. **Customer Reviews**:
   - File: [`src/data/reviews.js`](./src/data/reviews.js)
   - Add new genuine reviews, author names, stars, and quotes.
4. **Instagram Feed**:
   - File: [`src/data/instagram.js`](./src/data/instagram.js)
   - Add new photo URLs, dish tags, and captions.

---

## 🌐 Deployment (Vercel & Netlify)

### Deploying on Vercel
1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com/), click **New Project** and import your repository.
3. In **Environment Variables**, add all keys from your `.env`.
4. Deploy! `vercel.json` already includes SPA rewrites so `/menu`, `/order`, `/owner/*` resolve properly without 404s.

### Deploying on Netlify
1. In [Netlify](https://www.netlify.com/), click **Add new site > Import an existing project**.
2. Select your repository.
3. Build command: `npm run build` | Publish directory: `dist`.
4. In **Site Configuration > Environment variables**, add your keys.
5. Deploy! `netlify.toml` already includes `/* -> /index.html 200` rewrite rules.

---

## 📋 Verified Facts vs. Placeholders

### ✅ Verified Real Data Extracted from Research:
- **Exact Name**: Fullmoon Multicuisine Family Restaurant (also known as Full Moon Multicuisine Restaurant & Restobar)
- **Full Address**: BHEL Avemachs, Mangapuram Colony, Meenakshi Estate, Old Alwal, Secunderabad, Telangana 500010, India
- **Coordinates**: Latitude `17.4931° N`, Longitude `78.5036° E`
- **Google Place ID**: `ChIJtdhOnFabyzsRGh-cLpF7sxc`
- **Phone Numbers**: `+91 84998 34621` (Mobile/Hotline) and `+91 40 4858 7939` (Landline)
- **Operating Hours**: 12:00 PM to 11:00 PM (Daily, Monday to Sunday)
- **Google Rating**: `4.1 / 5.0` based on ~1,250+ genuine customer reviews
- **Customer Reviews**: 8 real reviews extracted directly from diner feedback citing Apollo Fish, Gongura Mutton Pulao, Tandoori Chicken, Achari Tikka, etc.
- **Top Dishes**: Apollo Fish, Special Chicken Biryani, Gongura Mutton Pulao, Dragon Chicken, Tandoori Tangdi Kebab.

### 📌 Things to Update (Clearly Marked Placeholders):
Located in [`src/config/restaurant.js`](./src/config/restaurant.js):
- `TODO_INSTAGRAM_HANDLE`: Update with the restaurant's claimed Instagram handle if they create a dedicated handle.
- `TODO_OWNER_EMAIL_ADDRESS_info@fullmoonrestaurant.com`: Update with the owner's custom business email if desired.
- `VITE_RAZORPAY_KEY_ID`: Replace `rzp_test_placeholder_key` with live or test merchant credentials.

