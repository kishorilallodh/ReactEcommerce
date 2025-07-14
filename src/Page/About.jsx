import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef();
  const heroContentRef = useRef();
  const storySectionRef = useRef();
  const storyContentRef = useRef();
  const storyImageRef = useRef();
  const valuesSectionRef = useRef();
  const valueCardsRef = useRef([]);
  const teamSectionRef = useRef();
  const ctaSectionRef = useRef();
  const ctaContentRef = useRef();

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl
      .from(heroRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      })
      .from(heroContentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }, "-=0.4");

    // Story section animation
    const storyTl = gsap.timeline({
      scrollTrigger: {
        trigger: storySectionRef.current,
        start: "top 75%"
      }
    });
    storyTl
      .from(storySectionRef.current.querySelector('h2'), {
        y: 30,
        opacity: 0,
        duration: 0.6
      })
      .from(storySectionRef.current.querySelector('.w-20'), {
        scaleX: 0,
        duration: 0.4
      }, "-=0.3")
      .from(storyContentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15
      }, "-=0.2")
      .from(storyImageRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

    // Values section animation
    const valuesTl = gsap.timeline({
      scrollTrigger: {
        trigger: valuesSectionRef.current,
        start: "top 75%"
      }
    });
    valuesTl
      .from(valuesSectionRef.current.querySelector('h2'), {
        y: 30,
        opacity: 0,
        duration: 0.6
      })
      .from(valuesSectionRef.current.querySelector('.w-20'), {
        scaleX: 0,
        duration: 0.4
      }, "-=0.3")
      .from(valueCardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }, "-=0.2");

    // Team section animation
    const teamTl = gsap.timeline({
      scrollTrigger: {
        trigger: teamSectionRef.current,
        start: "top 75%"
      }
    });
    teamTl
      .from(teamSectionRef.current.querySelector('h2'), {
        y: 30,
        opacity: 0,
        duration: 0.6
      })
      .from(teamSectionRef.current.querySelector('.w-20'), {
        scaleX: 0,
        duration: 0.4
      }, "-=0.3")
      .from(teamSectionRef.current.querySelector('p'), {
        y: 20,
        opacity: 0,
        duration: 0.5
      }, "-=0.2");

    // CTA section animation
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSectionRef.current,
        start: "top 75%"
      }
    });
    ctaTl
      .from(ctaContentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      });

    // Clean up animations on unmount
    return () => {
      [heroTl, storyTl, valuesTl, teamTl, ctaTl].forEach(tl => tl.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-blue-600 text-white py-45 px-6">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Our team" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div ref={heroContentRef} className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ShopZone</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted online shopping destination since 2015
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storySectionRef} className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={storyContentRef}>
              <h3 className="text-2xl font-semibold mb-4">From Humble Beginnings</h3>
              <p className="text-gray-600 mb-4">
                Founded in 2015 by two college friends, ShopZone started as a small online bookstore in a garage. 
                What began as a passion project quickly grew into one of the most trusted e-commerce platforms.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission has always been simple: to provide quality products at affordable prices with exceptional 
                customer service.
              </p>
              <p className="text-gray-600">
                Today, we serve millions of customers worldwide with a catalog of over 50,000 products across 
                multiple categories.
              </p>
            </div>
            <div ref={storyImageRef} className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Our first store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesSectionRef} className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Quality Assurance",
                description: "Every product is carefully vetted to ensure it meets our high standards before reaching you."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fair Pricing",
                description: "We work directly with manufacturers to bring you the best prices without compromising quality."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "Customer Support",
                description: "Our dedicated support team is available 24/7 to assist with any questions or concerns."
              }
            ].map((value, index) => (
              <div 
                key={index}
                ref={el => valueCardsRef.current[index] = el}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section ref={teamSectionRef} className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet The Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The passionate people behind ShopZone's success
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="py-16 px-6 bg-blue-600 text-white">
        <div ref={ctaContentRef} className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8">
            Join millions of satisfied customers who trust ShopZone for their online shopping needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Browse Products
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;