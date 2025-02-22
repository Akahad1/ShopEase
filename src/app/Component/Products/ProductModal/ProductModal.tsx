import { TProduct } from "@/type/type";
import React from "react";
import { toast } from "sonner";

interface ProductModalProps {
  product: TProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addProduct = (data: any) => {
    if (!data) return;

    const existingProducts = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isProductExists = existingProducts.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item._id === data._id
    );

    if (isProductExists) {
      toast.error("Product is already in the cart!");
    } else {
      if (localStorage.getItem("email")) {
        existingProducts.push(data);

        localStorage.setItem("products", JSON.stringify(existingProducts));

        toast.success("Product added successfully!");
      } else {
        toast.error("Please Log in");
      }
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Product Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 rounded-lg"
          />

          {/* Product Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-green-600 font-semibold">{product.status}</p>
            <p className="text-gray-600 text-sm">SKU: {product.name}</p>
            {/* Price */}
            <div className="mt-2">
              {product.price && (
                <span className="line-through text-gray-500 mr-2">
                  ${product.price + 3}
                </span>
              )}
              <span className="text-green-600 text-xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {/* Rating */}
            <p className="mt-2">⭐ {product.review} Stars</p>
            {/* Brand */}
            <p className="mt-2">
              <strong>Brand:</strong> {product.details}
            </p>
            {/* Category */}
            <p className="mt-2">
              <strong>Category:</strong> {product.categories}
            </p>
            {/* Tags */}
            <p className="mt-2">
              {/* <strong>Tags:</strong> {product.tags.join(", ")} */}
            </p>
            {/* Add to Cart Button */}
            <button
              onClick={() => addProduct(product)}
              disabled={product.status === "Out of Stock"}
              className="mt-4 btn btn-success w-full"
            >
              Add to Cart
            </button>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
