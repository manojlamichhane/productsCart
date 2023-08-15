"use client";
import React from "react";
import Image from "next/image";
import { CartProductCard, CustomButton, OrdersDetail } from "@/components";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../Redux/hook";

const Cart = () => {
  const response = useAppSelector((reduxState) => reduxState.Cart);
  const { loading, products, error } = response;
  const router = useRouter();

  return (
    <div className="flex-1 pt-32 padding-x">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>
      {products.length === 0 ? (
        <div className="flex items-center flex-col">
          <Image
            src="/empty-cart.png"
            alt="empty cart"
            width={900}
            height={900}
            className="object-contain"
          />
          <CustomButton
            title="Add products"
            containerStyles="bg-primary-blue text-white rounded-full "
            handleClick={() => router.push("/")}
            btnType="button"
          />
        </div>
      ) : loading ? (
        <>Loading....</>
      ) : (
        <div className="flex flex-col justify-between lg:flex-row ">
          <CartProductCard products={products} />
          <OrdersDetail products={products} />
        </div>
      )}
    </div>
  );
};

export default Cart;
