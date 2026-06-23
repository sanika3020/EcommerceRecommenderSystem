 E-Commerce Recommendation Engine
A high-performance, full-stack, real-time personalized product recommendation engine and shopping simulator. This application demonstrates custom collaborative-filtering and content-based recommendation techniques built from scratch, paired with a modern React dynamic storefront.

📸 Screenshots
Here is a preview of the application in action. 
🖥️ Main Dashboard Overview
Interactive personalized recommendations, shopper profile switcher, and real-time live predictive utility matrix:
![SS-1]([(https://github.com/sanika3020/EcommerceRecommenderSystem/blob/main/ERS-1.png]))
![SS-2]((https://github.com/sanika3020/EcommerceRecommenderSystem/blob/main/ERS%20-2.png))
![SS-3]((https://github.com/sanika3020/EcommerceRecommenderSystem/blob/main/ERS-3.png))
![SS-4]((https://github.com/sanika3020/EcommerceRecommenderSystem/blob/main/ERS-4.png))

✨ Features Key Core
1- Scratch-Built Hybrid Recommender: Merges user-item ratings Collaborative Filtering (Cosine Similarity matching) with Content-Based filtering using dynamic tags to generate robust, cold-start-immune recommendations.
2- Real-Time Matrix Inspector: A fully interactive, live-updating visual matrix displaying current users, rated products, utility index scores, and predicted system weights.
3-  Dynamic Shopper Profiles: Create, manage, and delete active customer profiles on-the-fly. Choose user-specific shopping personas (e.g., gamers, standard, outdoorsy) to observe how the recommender tailors results instantly.
4-  Fluid Micro-Interactions: Features animations powered by Motion/React (Framer Motion) for modals, shopping carts, and interactive rating stars.
5-  Sandbox-Safety: Configured with local state fallback synchronizers, fully custom alerts, and modal confirmation states to guarantee seamless compatibility with sandboxed iframes.
6-  Clean Full-Stack Bundle: Fully automated bundling via esbuild compiling the Express backend to a self-contained runtime.

🛠️ Tech Stack
Frontend
UI Framework: React with Vite & TypeScript
Styling: Tailwind CSS (Modern utility CSS)
Animations: Motion (motion/react)
Icons: Lucide React

Backend
Runtime: Node.js, Express (REST API)
Development tool: tsx (TypeScript Execute)
Build System: esbuild for CJS production compilation
Recommendation Math
User-User Similarity: Cosine similarity metric
Dynamic Hybridization: Weight-normalized rating interpolation

🚀 Local Installation & Setup
Follow these steps to run this project locally on your machine.
Prerequisites
Ensure you have Node.js (v18 or higher) installed.
Ensure you have npm installed.

1. Clone the Repository
code
Bash
git clone https://github.com/sanika3020/EcommerceRecommenderSystem.git
cd your-repo-name
2. Install Dependencies
code
Bash
npm install
3. Start Development Server
This boots up the integrated frontend + Express API server utilizing automatic hot-reloading:
code
Bash
npm run dev
Open your browser and navigate to http://localhost:3000.
4. Build and Start for Production
To bundle and compile the application for a lightweight, optimized production container release:
code
Bash
# Build Vite static assets and bundle the backend using esbuild
npm run build

# Start the Node assembly server in production mode
npm run start

