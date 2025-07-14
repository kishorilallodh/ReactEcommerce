import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { FaSearch, FaShoppingCart, FaHome, FaBoxOpen, FaInfoCircle, FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import gsap from "gsap";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const navbarRef = useRef();
  const logoRef = useRef();
  const linksRef = useRef([]);
  const searchRef = useRef();
  const loginRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Navbar background animation
    tl.from(navbarRef.current, {
      y: -100,
      duration: 0.8,
      opacity: 0
    })
    .from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5
    }, "-=0.5")
    .from(linksRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, "-=0.4")
    .from(searchRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, "-=0.3")
    .from(loginRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4
    }, "-=0.2");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  };

  return (
    <nav 
      ref={navbarRef}
      className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 shadow-lg sticky top-0 z-50"
    >
      {/* Logo */}
      <div ref={logoRef}>
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <HiShoppingBag className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold bg-clip-text text-white">
            ShopZone
          </span>
        </Link>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-8 text-lg items-center">
        {[
          { to: "/", icon: <FaHome className="mr-1" />, text: "Home" },
          { to: "/products", icon: <FaBoxOpen className="mr-1" />, text: "Products" },
          { to: "/cartpage", icon: <FaShoppingCart className="mr-1" />, text: "Cart" },
          { to: "/about", icon: <FaInfoCircle className="mr-1" />, text: "About" }
        ].map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            ref={el => linksRef.current[index] = el}
            className="flex items-center gap-1 rounded transition-colors px-2 py-1 hover:bg-blue-500"
          >
            {link.icon} {link.text}
          </Link>
        ))}
      </div>

      {/* Search and Login */}
      <div className="flex items-center gap-4">
        <form 
          ref={searchRef}
          onSubmit={handleSearch} 
          className="flex items-center bg-white rounded-full shadow-md px-3 py-1 focus-within:ring-2 focus-within:ring-blue-300"
        >
          <FaSearch className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-gray-800 md:w-64"
          />
        </form>

        <button
          ref={loginRef}
          type="button"
          className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
        >
          <FaUser /> Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;