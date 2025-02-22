/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { TProduct } from "@/type/type";

import Image from "next/image";
import { useState } from "react";
import ProductModal from "./ProductModal/ProductModal";
interface ProductsProps {
  isLoading: boolean;
  AllProduct: { data: TProduct[] };
}
const Products: React.FC<ProductsProps> = ({ isLoading, AllProduct }) => {
  if (isLoading) {
    return <span>loading</span>;
  }
  console.log(AllProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto p-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {AllProduct.data.map((product: TProduct) => (
            <div
              key={product._id}
              className="card w-80 bg-base-100 mx-auto shadow-xl"
            >
              {/* Image section */}
              <figure>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </figure>

              {/* Card body */}
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-lg font-semibold">${product.price}</p>

                {/* Star rating */}
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`mask mask-star-2 ${
                        i < product.review ? "bg-orange-400" : "bg-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => openModal(product)}
                  className="btn btn-primary w-full mt-2"
                >
                  View Details
                </button>
                {/* <div className="card-actions justify-end">
                  <button className="btn btn-primary">Add to cart</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Products;
