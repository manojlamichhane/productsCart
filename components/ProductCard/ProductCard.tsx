"use client";
import { ProductProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductCard = ({
  title,
  discountPercentage,
  price,
  rating,
  thumbnail,
}: ProductProps) => {
  return (
    <div className="card w-80 h-full bg-base-100 shadow-xl flex flex-col p-6 justify-center items-start text-black-100 hover:bg-gray-200 hover:shadow-md rounded-3xl">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={thumbnail}
          alt="thumbnail"
          className="object-contain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="card-body">
        <h2 className="car-card__content-title">{title}</h2>
        <Rating style={{ maxWidth: 75 }} value={rating} readOnly={true} />
        <div className="flex flex-row justify-between items-center">
          <div className="car-card__discount">
            <p className="car-card__price-dollar ">{discountPercentage}% off</p>
          </div>
          <div className="flex flex-row ">
            <p className="car-card__price-dollar">$</p>
            <p className="car-card__price">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
