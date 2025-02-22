"use client";

import { useCrateOrderMutation } from "@/app/Component/GlobalRedux/Features/AllApi/AllApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  _id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("products") || "[]");
    setCart(storedCart);
    setSubtotal(
      storedCart.reduce(
        (acc: number, item: Product) => acc + item.price * item.quantity,
        0
      )
    );
  }, []);
  const [addOrder] = useCrateOrderMutation();
  const addOrders = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const orderDetails = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      address: formData.get("address"),
      country: formData.get("country"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cart,
      subtotal,
      paymentMethod,
    };

    // localStorage.setItem("order", JSON.stringify(orderDetails));
    console.log(orderDetails);

    try {
      const res = await addOrder(orderDetails);
      console.log(res);
      if (res.data) {
        toast.success("Order placed successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("SomeThing is Rong");
    }
  };

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* Billing Information */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
        <form onSubmit={addOrders}>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="input"
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="Last name (optional)"
            />
          </div>
          <input
            className="input mt-4"
            type="text"
            name="company"
            placeholder="Company Name (optional)"
          />
          <input
            className="input mt-4"
            type="text"
            name="address"
            placeholder="Street Address"
            required
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <select className="input" name="country" required>
              <option>Bangladeash</option>
            </select>
            <select className="input" name="state" required>
              <option>Dhaka Division</option>
              <option>Chattogram Division</option>
              <option>Rajshahi Division</option>
              <option>Khulna Division</option>
              <option>Barishal Division</option>
              <option>Sylhet Division</option>
              <option>Rangpur Division</option>
              <option>Mymensingh Division</option>
            </select>
            <input
              className="input"
              type="text"
              name="zip"
              placeholder="Zip Code"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <input
              className="input"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="differentAddress" /> Ship to a
              different address
            </label>
          </div>
          <button type="submit" className="btn btn-success w-full mt-4">
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cart.map((product) => (
          <div key={product._id} className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded"
              />
              <span>
                {product.name} x{product.quantity}
              </span>
            </div>
            <span>${(product.price * product.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
        <div className="mt-2">
          {["Cash on Delivery", "Paypal", "Amazon Pay"].map((method) => (
            <label key={method} className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
