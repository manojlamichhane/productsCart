"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import CustomButton from "../CustomButton/CustomButton";
import { addProduct } from "../../app/Redux/features/Products/cartSlice";
import Loading from "../Loading";
import { useAppSelector, useAppDispatch } from "../../app/Redux/hook";
import { ProductProps } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailsCard = (props: { product: ProductProps }) => {
  const { product } = props;
  const [thumbnail, setthumbnail] = useState("");
  const dispatch = useAppDispatch();
  const response = useAppSelector((reduxState) => reduxState.products);
  const { loading } = response;

  const handleCart = async (id: string) => {
    await dispatch(addProduct(id));
    toast("Added to cart", {
      position: "bottom-left",
      theme: "colored",
      type: "success",
    });
  };

  useEffect(() => {
    setthumbnail(product.thumbnail);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row ">
          <div className="p-10">
            <Image
              src={thumbnail}
              alt="thumbnail"
              width={450}
              height={400}
              className="object-contain"
            />
            <div className="flex flex-row justify-center ">
              {product?.images?.map((el) => {
                return (
                  <div
                    key={el}
                    className="p-2 border-2 border-black-100"
                    onClick={() => setthumbnail(el)}
                  >
                    <Image
                      src={el}
                      alt="images"
                      width={40}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="m-6">
            <h2 className="card__content-title text-4xl font-bold">
              {product.title}
            </h2>
            <p className="card__content-subtitle">{product.description}</p>
            <Rating
              style={{ maxWidth: 75 }}
              value={product.rating}
              readOnly={true}
            />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <p className="car-card__price-dollar">$</p>
                <p className="car-card__price">{product.price}</p>
              </div>
              <div className="car-card__discount flex flex-row">
                <p className="car-card__price-dollar">
                  {product.discountPercentage}% off
                </p>
              </div>
            </div>
            <CustomButton
              title="Add to Cart"
              containerStyles="bg-primary-blue text-white rounded-full mt-10"
              handleClick={() => handleCart(product?._id)}
              btnType="button"
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DetailsCard;
