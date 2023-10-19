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
    <div className="car-card group">
      <div className="car-card__content flex-col">
        <div className="relative w-full h-40 my-3 object-contain">
          <Image
            src={thumbnail}
            alt="thumbnail"
            className="object-contain"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <>
          <h2 className="car-card__content-title">{title}</h2>
          <Rating style={{ maxWidth: 75 }} value={rating} readOnly={true} />
          <div className="car-card__discount">
            <p className="car-card__price-dollar">{discountPercentage}% off</p>
          </div>
          <div className="flex flex-row ">
            <p className="car-card__price-dollar">$</p>
            <p className="car-card__price">{price}</p>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductCard;
