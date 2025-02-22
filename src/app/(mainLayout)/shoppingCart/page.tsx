"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("products") || "[]");
    setCart(storedCart);

    // Retrieve subtotal if available
    const storedSubtotal = localStorage.getItem("subtotal");
    if (storedSubtotal) {
      setSubtotal(parseFloat(storedSubtotal));
    }
  }, []);

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    const newSubtotal = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setSubtotal(newSubtotal);
    localStorage.setItem("subtotal", newSubtotal.toFixed(2));
  }, [cart]);

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("products", JSON.stringify(updatedCart));
  };

  // Remove product from cart
  const removeProduct = (id: number) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("products", JSON.stringify(updatedCart));
    toast.success("Product removed");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-sm lg:text-xl">
                      {product.name}
                    </h3>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(product._id, (product.quantity || 1) - 1)
                    }
                    className="btn lg:btn-sm btn-xs btn-outline"
                    disabled={(product.quantity || 1) <= 1}
                  >
                    -
                  </button>
                  <span className="px-3">{product.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(product._id, (product.quantity || 1) + 1)
                    }
                    className="btn lg:btn-sm btn-xs btn-outline"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-sm lg:text-xl ml-2">
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </p>
                <button
                  onClick={() => removeProduct(product._id)}
                  className="btn lg:btn-sm btn-xs ml-2 btn-error"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Cart Total</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <Link href="/Checkout">
              <button className="btn btn-success w-full mt-4">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}

      <button
        className="btn btn-outline mt-4"
        onClick={() => window.history.back()}
      >
        Return to Shop
      </button>
    </div>
  );
};

export default CartPage;
