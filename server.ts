/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

import { Product, Interaction, UserProfile, RecommendationResponse } from "./src/types";
import { HybridRecommender } from "./server/recommender";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// 1. SEED DATA SETUP
// ==========================================

const PRODUCTS: Product[] = [
  {
    id: "prod-buds",
    name: "ZenBuds Pro Wireless Earbuds",
    category: "Audio",
    price: 129,
    description: "Premium noise-canceling wireless earbuds featuring deep acoustic bass, spatial audio, and sweat-resistant design. Perfect for active commutes and gym sessions.",
    image: "headphones",
    tags: ["wireless", "audio", "gym", "noise-canceling"],
    averageRating: 4.8
  },
  {
    id: "prod-keyboard",
    name: "MechGrip Mechanical Keyboard",
    category: "Peripherals",
    price: 89,
    description: "Tactile hot-swappable RGB mechanical keyboard built with authentic linear switches, durable double-shot caps, and custom height adjustments for high-output productivity.",
    image: "keyboard",
    tags: ["keyboard", "gaming", "tactile", "rgb"],
    averageRating: 4.6
  },
  {
    id: "prod-watch",
    name: "Chronos Active Smart Watch",
    category: "Wearables",
    price: 199,
    description: "Always-on sleek fitness tracker measuring real-time heart rate, sleep cycles, SPO2 metrics, and sport-tracking modes with built-in GPS mapping.",
    image: "watch",
    tags: ["smartwatch", "fitness", "gps", "health"],
    averageRating: 4.5
  },
  {
    id: "prod-nebula",
    name: "Nebula: Dystopian Horizons Novel",
    category: "Books",
    price: 15,
    description: "An award-winning cyberpunk science-fiction novel revolving around deep-space AI systems, cybernetic neural links, and a gritty search for digital freedom.",
    image: "book-open",
    tags: ["sci-fi", "cyberpunk", "books", "fiction"],
    averageRating: 4.9
  },
  {
    id: "prod-skillet",
    name: "Cast-Iron Heritage Skillet",
    category: "Home & Kitchen",
    price: 45,
    description: "Heavy-duty pre-seasoned cast iron skillet offering superb heat retention and distribution. Perfect for pan-searing steaks, baking corn bread, and roasting.",
    image: "chef-hat",
    tags: ["cooking", "cast-iron", "kitchen", "heritage"],
    averageRating: 4.7
  },
  {
    id: "prod-diffuser",
    name: "Aura Bamboo Oil Diffuser",
    category: "Home & Kitchen",
    price: 34,
    description: "Ultrasonic cool-mist essential oil diffuser layered with real natural bamboo, featuring colored ambient mood lights and programmed auto-shutoff safety triggers.",
    image: "droplet",
    tags: ["wellness", "aromatherapy", "bamboo", "mood"],
    averageRating: 4.4
  },
  {
    id: "prod-bands",
    name: "FitPulse Resistance Bands Set",
    category: "Fitness",
    price: 24,
    description: "Heavy-duty workout loops with varying tension weights. Durable flat Latex build optimal for physical therapy routines, Pilates, and at-home resistance training.",
    image: "dumbbell",
    tags: ["fitness", "resistance", "workout", "latex"],
    averageRating: 4.3
  },
  {
    id: "prod-living",
    name: "The Art of Simple Living (Book)",
    category: "Books",
    price: 18,
    description: "A beautifully illustrated guide containing Zen mindfulness insights, minimalist home hacks, and simple habit resets that promote inner peace, deep focus, and stress reduction.",
    image: "book",
    tags: ["mindfulness", "zen", "minimalism", "productivity"],
    averageRating: 4.8
  },
  {
    id: "prod-hoodie",
    name: "EcoWeave Organic Cotton Hoodie",
    category: "Apparel",
    price: 65,
    description: "Ultra-soft unisex streetwear pullover knit from certified organic cotton fibers. Cozy fleece lining, generous pouch, and natural dyed aesthetics.",
    image: "shirt",
    tags: ["apparel", "sustainable", "comfort", "streetwear"],
    averageRating: 4.5
  },
  {
    id: "prod-espress",
    name: "AeroBrew Portable Espresso Press",
    category: "Home & Kitchen",
    price: 49,
    description: "Compact, manually operated espresso press delivering pristine golden crema using micro-press filters. Lightweight, non-electric, and ideal for serious coffee lovers.",
    image: "cup-soda",
    tags: ["coffee", "espresso", "travel", "manual"],
    averageRating: 4.7
  },
  {
    id: "prod-backpack",
    name: "Nomad Ergonomic Tech Backpack",
    category: "Apparel",
    price: 110,
    description: "Weatherproof high-capacity security commute bag outfitted with 16-inch laptop pocket padding, USB bypass plug, hidden anti-theft organizer sleeves, and contoured strap support.",
    image: "bag",
    tags: ["travel", "laptop", "weatherproof", "commuter"],
    averageRating: 4.6
  },
  {
    id: "prod-pillow",
    name: "DeepSleep Memory Foam Pillow",
    category: "Home & Kitchen",
    price: 55,
    description: "Orthopedic neck cervical contour support pillow crafted with premium cool-gel infused memory foam. Clinically aligned for ideal spinal sleeping postures.",
    image: "bed",
    tags: ["sleep", "foam", "orthopedic", "comfort"],
    averageRating: 4.3
  },
  {
    id: "prod-garden",
    name: "Verdant Self-Watering Herb Garden",
    category: "Home & Kitchen",
    price: 39,
    description: "Elegant indoor window garden system. Features dual self-watering clay tanks, organic potting soil, and premium basil, cilantro, and parsley seed starters.",
    image: "flower",
    tags: ["garden", "herbs", "self-watering", "home"],
    averageRating: 4.5
  },
  {
    id: "prod-light",
    name: "GlowGrid Desktop RGB Lightstrip",
    category: "Peripherals",
    price: 29,
    description: "Intelligent background lighting strip syncing seamlessly with computer displays, music rhythms, or mobile apps. Instant immersion for a clean custom gaming desk setup.",
    image: "tv",
    tags: ["rgb", "gaming", "ambient", "led"],
    averageRating: 4.4
  },
  {
    id: "prod-timer",
    name: "FocusTime Mechanical Pomodoro",
    category: "Fitness", // We treat this under a wellness/fitness of mind category
    price: 19,
    description: "An elegant physical countdown mechanism running entirely mechanical wind-up. Zero screen distractions with satisfying mechanical ringing to prompt intervals.",
    image: "timer",
    tags: ["productivity", "focus", "mechanical", "pomodoro"],
    averageRating: 4.2
  },
];

const DEFAULT_USERS: UserProfile[] = [
  {
    id: "user-alice",
    name: "Alice",
    avatar: "👩‍💻",
    persona: "Tech enthusiast who enjoys high-end desk setups, gaming peripherals, and convenient wearable fitness gadgets."
  },
  {
    id: "user-bob",
    name: "Bob",
    avatar: "👨‍",
    persona: "Quiet bookworm and coffee purist. Prefers science fiction, mindfulness books, manual coffee presses, and zero digital distractions."
  },
  {
    id: "user-charlie",
    name: "Charlie",
    avatar: "🧘",
    persona: "Fitness consultant. Highly interested in clean cast iron cooking, muscle recovery loops, posture sleep wellness, and smart health watches."
  },
  {
    id: "user-diana",
    name: "Diana",
    avatar: "🎒",
    persona: "Eco-friendly traveler. Loves durable weather-proof backpacks, indoor self-growing herb garnishes, comfortable clothing, and simple living guides."
  },
  {
    id: "user-ethan",
    name: "Ethan",
    avatar: "☕",
    persona: "Culinary explorer and caffeine designer. Loves professional kitchenware, espresso mechanics, garden starters, and soothing ambient room lighting."
  }
];

let USERS: UserProfile[] = [...DEFAULT_USERS];

// Initial pre-seeded reviews representing user personas
const SEED_INTERACTIONS: Interaction[] = [
  // Alice (Tech) reviews
  { userId: "user-alice", productId: "prod-keyboard", rating: 5, viewCount: 12, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-alice", productId: "prod-buds", rating: 5, viewCount: 8, isPurchased: true, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-alice", productId: "prod-light", rating: 4, viewCount: 15, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-alice", productId: "prod-watch", rating: 4, viewCount: 5, isPurchased: false, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-alice", productId: "prod-living", rating: 2, viewCount: 2, isPurchased: false, isWishlisted: false, updatedAt: Date.now() },

  // Bob (Bookworm) reviews
  { userId: "user-bob", productId: "prod-nebula", rating: 5, viewCount: 10, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-bob", productId: "prod-living", rating: 5, viewCount: 6, isPurchased: true, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-bob", productId: "prod-espress", rating: 4, viewCount: 4, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-bob", productId: "prod-keyboard", rating: 3, viewCount: 3, isPurchased: false, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-bob", productId: "prod-watch", rating: 1, viewCount: 1, isPurchased: false, isWishlisted: false, updatedAt: Date.now() }, // Despises screens

  // Charlie (Fitness) reviews
  { userId: "user-charlie", productId: "prod-bands", rating: 5, viewCount: 11, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-charlie", productId: "prod-watch", rating: 5, viewCount: 9, isPurchased: true, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-charlie", productId: "prod-skillet", rating: 4, viewCount: 7, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-charlie", productId: "prod-pillow", rating: 4, viewCount: 3, isPurchased: false, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-charlie", productId: "prod-light", rating: 2, viewCount: 3, isPurchased: false, isWishlisted: false, updatedAt: Date.now() },

  // Diana (Eco-Travel) reviews
  { userId: "user-diana", productId: "prod-backpack", rating: 5, viewCount: 8, isPurchased: true, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-diana", productId: "prod-hoodie", rating: 5, viewCount: 6, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-diana", productId: "prod-living", rating: 4, viewCount: 4, isPurchased: false, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-diana", productId: "prod-garden", rating: 4, viewCount: 5, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },

  // Ethan (Home Chef / Coffee) reviews
  { userId: "user-ethan", productId: "prod-espress", rating: 5, viewCount: 14, isPurchased: true, isWishlisted: false, updatedAt: Date.now() },
  { userId: "user-ethan", productId: "prod-skillet", rating: 5, viewCount: 8, isPurchased: true, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-ethan", productId: "prod-garden", rating: 4, viewCount: 9, isPurchased: false, isWishlisted: true, updatedAt: Date.now() },
  { userId: "user-ethan", productId: "prod-buds", rating: 3, viewCount: 2, isPurchased: false, isWishlisted: false, updatedAt: Date.now() },
];

/**
 * In-memory copy of active interactions which users can modify
 */
let dbInteractions: Interaction[] = [...SEED_INTERACTIONS];

// Initialize global recommender engine instance
const engine = new HybridRecommender();

// Train engine on active interaction profiles
const trainRecommender = () => {
  const users = USERS.map(u => u.id);
  // Also collect any dynamic dynamic guest users who interacted
  const allUsers = Array.from(new Set([...users, ...dbInteractions.map(i => i.userId)]));
  engine.fit(allUsers, PRODUCTS, dbInteractions);
};

// Perform initial fit
trainRecommender();

// ==========================================
// 2. BACKEND ROUTING / ENDPOINTS
// ==========================================

// Get product catalog
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// Get user list
app.get("/api/users", (req, res) => {
  res.json(USERS);
});

// Get all interactions
app.get("/api/interactions", (req, res) => {
  res.json(dbInteractions);
});

// Add new user profile custom dynamically
app.post("/api/users", (req, res) => {
  const { name, avatar, persona } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const cleanId = `user-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString().slice(-4)}`;
  const newUser = {
    id: cleanId,
    name: name.trim(),
    avatar: avatar || "👤",
    persona: persona || "A customer exploring items."
  };
  USERS.push(newUser);
  trainRecommender();
  res.json(newUser);
});

// Delete user profile dynamically
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userExists = USERS.some(u => u.id === id);
  if (!userExists) {
    res.status(404).json({ error: "User profile not found." });
    return;
  }
  if (USERS.length <= 1) {
    res.status(400).json({ error: "Cannot delete the last remaining shopper." });
    return;
  }
  
  // Remove user
  USERS = USERS.filter(u => u.id !== id);
  // Clean up interactions
  dbInteractions = dbInteractions.filter(i => i.userId !== id);
  
  // Retrain matrix factorization levels
  trainRecommender();
  res.json({ success: true, message: "Shopper deleted successfully." });
});

// Reset interactions and users to default seeds
app.post("/api/reset", (req, res) => {
  dbInteractions = [...SEED_INTERACTIONS];
  USERS = [...DEFAULT_USERS];
  trainRecommender();
  res.json({ message: "Interactions and user accounts reset to seeds." });
});

// Update specific interaction (views, rating, wishlist, purchase)
app.post("/api/interact", (req, res) => {
  const { userId, productId, rating, isView, isWishlistToggle, isPurchase } = req.body;

  if (!userId || !productId) {
    res.status(400).json({ error: "Missing userId or productId" });
    return;
  }

  let matchidx = dbInteractions.findIndex(i => i.userId === userId && i.productId === productId);

  if (matchidx === -1) {
    const newInteraction: Interaction = {
      userId,
      productId,
      viewCount: 0,
      isPurchased: false,
      isWishlisted: false,
      updatedAt: Date.now()
    };
    dbInteractions.push(newInteraction);
    matchidx = dbInteractions.length - 1;
  }

  const interaction = dbInteractions[matchidx];

  if (isView) {
    interaction.viewCount += 1;
  }
  if (rating !== undefined) {
    interaction.rating = rating;
  }
  if (isWishlistToggle !== undefined) {
    interaction.isWishlisted = !interaction.isWishlisted;
  }
  if (isPurchase !== undefined) {
    interaction.isPurchased = isPurchase;
  }

  interaction.updatedAt = Date.now();

  // Re-train with updated interactions
  trainRecommender();

  res.json({ message: "Interaction logged successfully", interaction });
});

// Clear entire shopping cart for a user (marks all isPurchased to false)
app.post("/api/cart/clear", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ error: "Missing userId" });
    return;
  }

  dbInteractions = dbInteractions.map(i => {
    if (i.userId === userId && i.isPurchased) {
      return { ...i, isPurchased: false, updatedAt: Date.now() };
    }
    return i;
  });

  trainRecommender();

  res.json({ success: true, message: "Cart cleared successfully", interactions: dbInteractions });
});

// Fetch hybrid recommendations and rating prediction matrix
app.get("/api/recommendations", (req, res) => {
  const userId = (req.query.userId as string) || "user-alice";
  const colRatio = parseFloat(req.query.colRatio as string) ?? 0.5;

  const users = USERS.map(u => u.id);
  const allUsers = Array.from(new Set([...users, ...dbInteractions.map(i => i.userId)]));

  const list = engine.getRecommendations(userId, PRODUCTS, dbInteractions, colRatio);
  const matrixState = engine.getMatrixState(allUsers, PRODUCTS, dbInteractions);

  const payload: RecommendationResponse = {
    userId,
    recommendations: list,
    matrixState
  };

  res.json(payload);
});

// ==========================================
// 3. VITE MIDDLEWARE & FRONTEND PRODUCTION HANDLERS
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Set up Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware activated.");
  } else {
    // Serve production static assets compiled under /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-commerce recommender server listening at http://localhost:${PORT}`);
  });
}

startServer();
