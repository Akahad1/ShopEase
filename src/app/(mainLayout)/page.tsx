import Navbar from "@/app/Component/Navbar/Navbar";
import Products from "../Component/Products/Products";
import FilterSidebar from "../Component/FilterSidebar/FilterSidebar";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:grid lg:grid-cols-12">
        <div className="lg:col-span-5">
          <FilterSidebar></FilterSidebar>
        </div>
        <div className="lg:col-span-7">
          <Products></Products>
        </div>
      </div>
    </div>
  );
};

export default page;
