"use client";
import { TProduct } from "@/type/type";
import { useGetAllproductQuery } from "../GlobalRedux/Features/AllApi/AllApi";


const Products = () => {
  const { data: AllProduct, isLoading } = useGetAllproductQuery(undefined);
  if (isLoading) {
    return <span>loading</span>;
  }
  console.log(AllProduct);
  return (
    <div>
      <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {AllProduct.map((product:TProduct) => (
          <Card key={product._id} className="shadow-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <CardContent>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">{product.price}</p>
              <div className="flex justify-between items-center mt-2">
                <Button disabled={!product.inStock} className="bg-green-500 text-white px-4 py-2 rounded">
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Heart className="text-gray-500 cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Products;
