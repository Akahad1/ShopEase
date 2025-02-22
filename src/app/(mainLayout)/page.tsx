/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Products from "../Component/Products/Products";
import FilterSidebar from "../Component/FilterSidebar/FilterSidebar";
import { useState } from "react";
import { useGetAllproductQuery } from "../Component/GlobalRedux/Features/AllApi/AllApi";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15]);

  const [rating, setRating] = useState<number | null>(0);
  console.log(selectedCategory, priceRange, rating);
  const { data: AllProduct, isLoading } = useGetAllproductQuery([
    { name: "rating", value: rating },
    { name: "category", value: selectedCategory },
    { name: "minPrice", value: priceRange[0] },
    { name: "maxPrice", value: priceRange[1] },
  ]);
  return (
    <div>
      <div className="lg:grid lg:mt-10 lg:grid-cols-12">
        <div className="lg:col-span-3 ">
          <FilterSidebar
            setRating={setRating}
            rating={rating}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></FilterSidebar>
        </div>
        <div className="lg:col-span-9">
          <Products AllProduct={AllProduct} isLoading={isLoading}></Products>
        </div>
      </div>
    </div>
  );
};

export default page;
