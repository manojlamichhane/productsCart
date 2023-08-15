import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  source?: string;
}
export interface IconButtonProps {
  source: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  styles?: string;
  width?: number;
  height?: number;
}
export interface fetchProductprops {
  loading: boolean;
  allProductsSlice: [];
  error: string;
}
export interface ProductProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  stock?: number;
  category: string;
  thumbnail: string;
  images?: string[];
  quantity?: number;
}

export interface OrdersProps {
  _id: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  paymentIntentId: string;
  paymentStatus: string;
  products: ProductProps[];
  subTotal: number;
  total: number;
  userId: string;
}

export interface ProductsSliceProps {
  loading: boolean;
  products: [];
  selectedProduct: {};
  stats: [];
  error: string;
}
