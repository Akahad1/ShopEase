/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useGetOrderQuery } from "@/app/Component/GlobalRedux/Features/AllApi/AllApi";
import React from "react";
interface Order {
  _id: string;
  subtotal: number;
  cart: { length: number }[];
}
const OrderHistory = () => {
  const email = localStorage.getItem("email");
  console.log(email);
  const { data: OrderData, isLoading } = useGetOrderQuery([
    { name: "email", value: email },
  ]);
  console.log(OrderData);

  if (isLoading) {
    return <p>Loadding</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      <div className="bg-white p-4 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ORDER ID</th>
              <th className="p-2">TOTAL</th>
              <th className="p-2">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {OrderData?.data?.map((order: Order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="p-2">#{order._id}</td>
                <td className="p-2">${order.subtotal}</td>
                <td className="p-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    {order.cart.length}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
