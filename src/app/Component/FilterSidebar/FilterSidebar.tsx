"use client";

interface FilterSidebarProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  priceRange: [number, number];
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  rating: number | null;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
}
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  setSelectedCategory,
  selectedCategory,
  priceRange,
  setPriceRange,
  rating,
  setRating,
}) => {
  const categories = ["Fruits", "Vegetables", "Cookies", "Bread"];

  return (
    <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg w-full md:w-1/4 lg:w-2/3 lg:ml-10 ml-2 mr-2  md:static top-0 left-0 md:top-auto md:left-auto z-50 md:z-auto">
      {/* <button className="md:hidden w-full bg-green-500 text-white p-2 rounded-lg">
        Filter
      </button> */}

      <div className="mt-4 md:mt-0">
        <h2 className="text-lg font-semibold">All Categories</h2>
        <ul className="mt-2 space-y-1">
          {categories.map((category) => (
            <li key={category} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-4 w-4 text-green-500 focus:ring-green-500"
              />
              <label className="text-gray-700">{category}</label>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Price</h2>
          <input
            type="range"
            min="0"
            max="15"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full mt-2"
          />
          <p className="text-sm text-gray-600">
            Price: {priceRange[0]} - {priceRange[1]}
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Rating</h2>
          <div className="mt-2 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className="h-4 w-4 text-green-500 focus:ring-green-500"
                />
                <span className="text-gray-700">{star}.0 & up</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
