import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';
import gsap from 'gsap';

// Lazy-loaded components
const Home = lazy(() => import('./Page/Home'));
const Products = lazy(() => import('./Page/Products'));
const About = lazy(() => import('./Page/About'));
const ProductDetails = lazy(() => import('./Page/ProductDetails'));
const CartPage = lazy(() => import('./Page/CartPage'));

function App() {
  useEffect(() => {
    // GSAP global configurations
    gsap.config({
      nullTargetWarn: false
    });
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to ShopZone</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your shopping experience...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;