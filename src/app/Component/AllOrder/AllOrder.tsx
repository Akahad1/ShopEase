/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  useGetAllorderQuery,
  useUpdateOrderMutation,
} from "@/app/Component/GlobalRedux/Features/AllApi/AllApi";
import React from "react";
interface Order {
  _id: string;
  email: string;
  state: string;
  address: string;
  statuses: "Confirmed" | "Processing" | "Shipped" | "Delivered";
}
const AllOrder = () => {
  const { data: AllOrder, isLoading } = useGetAllorderQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderMutation();
  console.log("AllOrder", AllOrder);
  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus({ id: orderId, statuses: newStatus });
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order Details</h1>
      {AllOrder?.data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">State</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {AllOrder.data.map((order: Order) => (
              <tr key={order._id} className="border">
                <td className="py-2 px-4 border">{order.email}</td>
                <td className="py-2 px-4 border">{order.state}</td>
                <td className="py-2 px-4 border">{order.address}</td>
                <select
                  className="border p-2 rounded"
                  value={order.statuses}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrder;
