import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { products } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs
  const heroRef = useRef();
  const heroContentRef = useRef();
  const featuredTitleRef = useRef();
  const featuredDescRef = useRef();
  const productRefs = useRef([]);
  const promoRef = useRef();
  const promoContentRef = useRef();
  const testimonialRef = useRef();
  const testimonialCardsRef = useRef([]);

  // Get featured products
  const featuredProducts = products.slice(0, 4);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      setIsLoading(false);
    }
  }, [featuredProducts]);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    let ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      });

      gsap.from(heroContentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });

      // Featured products animation
      const featuredTl = gsap.timeline({
        scrollTrigger: {
          trigger: featuredTitleRef.current,
          start: "top 80%",
          markers: false // Set to true for debugging
        }
      });

      featuredTl
        .from([featuredTitleRef.current, featuredDescRef.current], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2
        })
        .from(productRefs.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)"
        }, "-=0.4");

      // Promo banner animation
      const promoTl = gsap.timeline({
        scrollTrigger: {
          trigger: promoRef.current,
          start: "top 80%",
          markers: false
        }
      });

      promoTl
        .from(promoRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8
        })
        .from(promoContentRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=0.4");

      // Testimonials animation
      const testimonialTl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 80%",
          markers: false
        }
      });

      testimonialTl
        .from(testimonialRef.current.children[0].children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15
        })
        .from(testimonialCardsRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)"
        }, "-=0.3");
    });

    // Clean up animations on unmount
    return () => {
      ctx.revert(); // This will kill all GSAP animations and ScrollTriggers
      productRefs.current = []; // Reset product refs
      testimonialCardsRef.current = []; // Reset testimonial refs
    };
  }, [featuredProducts]); // Re-run when featuredProducts changes

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section with Image Background */}
        <section ref={heroRef} className="relative bg-blue-500 text-white py-38 px-6 overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img 
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Shopping background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div ref={heroContentRef} className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to ShopZone</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices with free shipping on all orders
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/products" 
                className="bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/about" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 ref={featuredTitleRef} className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p ref={featuredDescRef} className="text-lg text-gray-600 max-w-2xl mx-auto">
                Check out our most popular items this season
              </p>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-xl text-gray-600">Loading featured products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product, index) => (
                  <Link 
                    key={`${product.id}-${index}`}
                    to={`/products/${product.id}`}
                    ref={el => {
                      if (el) productRefs.current[index] = el;
                    }}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 w-full">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-contain p-6 bg-white transition-transform duration-300 group-hover:scale-105" 
                      />
                      {product.rating?.rate > 4.5 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          HOT
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {product.title.split(' ').slice(0, 5).join(' ')}
                      </h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">
                            {product.rating?.rate || 4.5} ★
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({product.rating?.count || 100})
                          </span>
                        </div>
                      </div>
                      <button 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                        onClick={(e) => e.preventDefault()}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Promo Banner with Image */}
        <section ref={promoRef} className="relative py-24 px-6 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Summer sale"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div ref={promoContentRef} className="container mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Summer Sale!</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Up to 50% off on selected items. Limited time offer!
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Deals
            </Link>
          </div>
        </section>
        
        {/* Testimonials */}
        <section ref={testimonialRef} className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  rating: "★★★★★",
                  text: "Great products and fast delivery! I'm very satisfied with my purchase. The quality exceeded my expectations.",
                  img: "https://randomuser.me/api/portraits/women/44.jpg",
                  name: "Sarah Johnson"
                },
                {
                  rating: "★★★★☆",
                  text: "Excellent customer service. Had an issue with my order and they resolved it quickly. Will shop here again!",
                  img: "https://randomuser.me/api/portraits/men/32.jpg",
                  name: "Michael Chen"
                },
                {
                  rating: "★★★★★",
                  text: "The quality of products exceeded my expectations. The packaging was also very eco-friendly which I appreciate.",
                  img: "https://randomuser.me/api/portraits/women/68.jpg",
                  name: "Emily Rodriguez"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  ref={el => {
                    if (el) testimonialCardsRef.current[index] = el;
                  }}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="text-yellow-400 text-2xl mb-4">{testimonial.rating}</div>
                  <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;