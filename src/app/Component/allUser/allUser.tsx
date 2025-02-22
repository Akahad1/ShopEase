/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useGetALluserQuery } from "@/app/Component/GlobalRedux/Features/AllApi/AllApi";
import React from "react";

const AllUser = () => {
  const { data: alluser, isLoading } = useGetALluserQuery(undefined);
  if (isLoading) {
    return <p>Loading</p>;
  }
  console.log(alluser);
  interface Tuser {
    _id: string;
    name: string;
    email: string;
    number: number;
  }
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">User List</h1>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {alluser?.data?.map((user: Tuser) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
