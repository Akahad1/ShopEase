"use client";

import Link from "next/link";

import { FaShoppingBag, FaSearch, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between py-4 lg:px-8 px-2 md:px-4 bg-white shadow-md">
        {/* Logo */}
        <div className="text-xl lg:text-2xl font-bold text-green-600 flex items-center">
          <span className="mr-2">🌱</span> ShopeEase
        </div>

        {/* Search Bar */}
        <div className="flex items-center border rounded-full px-4 py-2 w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none flex-1 text-gray-700 bg-transparent"
          />
          <button className="bg-green-600 lg:inline hidden text-white px-4 py-1 rounded-full">
            Search
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* <FaHeart className="text-gray-600 text-xl cursor-pointer" /> */}

          {/* Shopping Cart */}
          <div className="relative flex items-center">
            <FaShoppingBag className="text-gray-600 text-2xl cursor-pointer" />

            <Link href="/shoppingCart">
              <span className="text-gray-700 lg:inline hidden ml-2">
                Shopping cart
              </span>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex items-center text-gray-700"></div>
        </div>
      </nav>
      <div className="flex lg:px-8 md:px-4 px-2 bg-white  space-x-6 py-4 lg:py-6 text-gray-700 lg:text-xl text-sm font-medium border-t border-b">
        <Link href="/" className="flex items-center">
          Home <FaChevronDown className="ml-1 text-xs" />
        </Link>

        <Link href="#">Blog</Link>
        <Link href="#">About Us</Link>
        <Link href="/singup" className="flex items-center">
          SingUp
        </Link>
        <Link href="/login" className="lg:flex hidden items-center">
          LogIn
        </Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
