require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./db');

const products = [
  {
    title: "Quantum X1 Pro Ultra - Midnight Black",
    price: 1299,
    description: "The ultimate peak of performance. Featuring the next-gen neural engine, 8K retina display, and 48-hour battery life. Designed for those who never settle.",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=2526"],
    category: "Electronics",
    stock: 15,
    ratings: 4.9,
    numReviews: 128
  },
  {
    title: "EcoZen Bamboo Wireless Desktop set",
    price: 149,
    description: "Sustainable tech meets modern minimalist aesthetics. Hand-crafted bamboo finish with silent mechanical keys and ergonomic vertical mouse.",
    images: ["https://images.unsplash.com/photo-1541140134513-85a161dc4a00?auto=format&fit=crop&q=80&w=2670"],
    category: "Home",
    stock: 50,
    ratings: 4.7,
    numReviews: 85
  },
  {
    title: "Aurora Pure Linen Summer Blazer",
    price: 320,
    description: "Breathable, premium Italian linen. The perfect companion for beach weddings or high-stakes business meetings in the sun.",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=2680"],
    category: "Fashion",
    stock: 25,
    ratings: 4.5,
    numReviews: 42
  },
  {
    title: "Nebula Active ANC Headphones",
    price: 450,
    description: "Lose yourself in the music, not the noise. Industry-leading Active Noise Cancellation with spatial audio and vacuum-sealed memory foam cups.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2670"],
    category: "Electronics",
    stock: 20,
    ratings: 4.8,
    numReviews: 210
  },
  {
    title: "Serenity Hydration Spa set",
    price: 89,
    description: "Luxury at home. Essential oils infused with Dead Sea minerals and organic aloe vera for the ultimate skin rejuvenation experience.",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2670"],
    category: "Health",
    stock: 100,
    ratings: 4.6,
    numReviews: 156
  },
  {
    title: "Nomad Venture Carbon Fiber Watch",
    price: 599,
    description: "Indestructible yet lighter than air. 500m water resistance, scratch-proof sapphire crystal, and self-winding titanium movement.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=2599"],
    category: "Fashion",
    stock: 12,
    ratings: 5.0,
    numReviews: 18
  },
  {
    title: "Apex Gaming VR Station",
    price: 899,
    description: "Complete immersion. Ultra-low latency tracking with 144Hz dual OLED panels. The future of gaming starts here.",
    images: ["https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=2670"],
    category: "Electronics",
    stock: 8,
    ratings: 4.9,
    numReviews: 76
  },
  {
    title: "Velvet Cloud Ergo Office Chair",
    price: 450,
    description: "Engineered for support. Dynamically adjusting lumbar support and breathable mesh for 24/7 comfort during your deepest work sessions.",
    images: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&q=80&w=2574"],
    category: "Home",
    stock: 30,
    ratings: 4.7,
    numReviews: 134
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to DB for seeding...');
    
    await Product.deleteMany({}); // Optional: clear existing
    await Product.insertMany(products);
    
    console.log('Database successfully seeded with premium products! 🚀');
    process.exit();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
