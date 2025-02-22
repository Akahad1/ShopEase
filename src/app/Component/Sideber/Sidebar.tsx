"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  FaTachometerAlt,
  FaHistory,
  FaHeart,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useGetuserQuery } from "../GlobalRedux/Features/AllApi/AllApi";

interface SidebarProps {
  children: ReactNode;
}
export default function Sidebar({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const email = localStorage.getItem("email");
  const { data: userData, isLoading } = useGetuserQuery([
    { name: "email", value: email },
  ]);
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setIsOpen(false);
    window.location.href = "/";
  };
  if (isLoading) {
    return <p>Loading..</p>;
  }
  console.log("email.", userData);
  return (
    <div className="lg:flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <>
        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        {/* Sidebar */}
        {userData?.data?.role === "Customer" ? (
          <aside
            className={`fixed top-0 left-0 h-full bg-white shadow-md p-4 w-64 transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 min-h-screen md:translate-x-0 md:relative md:w-64`}
          >
            <nav>
              <ul className="space-y-4">
                <Link href="/">
                  <li
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaTachometerAlt /> Home
                  </li>
                </Link>
                <Link href="/OderHistory">
                  <li
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaHistory /> Order History
                  </li>
                </Link>
                <li
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                >
                  <FaHeart /> Wishlist
                </li>
                <Link href="/shoppingCart">
                  <li
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaShoppingCart /> Shopping Cart
                  </li>
                </Link>

                <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                  <FaCog /> Settings
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-red-500 "
                >
                  <FaSignOutAlt /> Log-out
                </li>
              </ul>
            </nav>
          </aside>
        ) : (
          <>
            <aside
              className={`fixed top-0 left-0 h-full bg-white shadow-md p-4 w-64 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 min-h-screen md:translate-x-0 md:relative md:w-64`}
            >
              <nav>
                <ul className="space-y-4">
                  <Link href="/">
                    <li
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                    >
                      <FaTachometerAlt /> Home
                    </li>
                  </Link>
                  <Link href="/allOrder">
                    <li
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                    >
                      <FaHistory />
                      All Order
                    </li>
                  </Link>

                  <Link href="/allUser">
                    <li
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                    >
                      <FaShoppingCart /> All User
                    </li>
                  </Link>

                  <li className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                    <FaCog /> Settings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded text-red-500 "
                  >
                    <FaSignOutAlt /> Log-out
                  </li>
                </ul>
              </nav>
            </aside>
          </>
        )}

        {/* Background Overlay (for mobile view) */}
      </>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
