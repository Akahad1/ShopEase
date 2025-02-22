export interface TProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  review: number;
  status: "In Stock" | "Out of Stock";
  details: string;
  categories: string;
}
export type TQureyParam = {
  name: string;
  value: string;
};
