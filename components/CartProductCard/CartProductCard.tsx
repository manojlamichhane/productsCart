import Image from "next/image";
import React from "react";
import { IconButton } from "..";
import { useAppDispatch } from "../../app/Redux/hook";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../../app/Redux/features/Products/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartProductCard = ({ products }: { products: any[] }) => {
  const dispatch = useAppDispatch();

  const incrementQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
    toast("Quantity Increased!", {
      position: "bottom-left",
      type: "success",
      theme: "colored",
    });
  };
  const decrementQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
    toast("Quantity Decreased!", {
      position: "bottom-left",
      type: "success",
      theme: "colored",
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    toast("Item deleted from cart!", {
      position: "bottom-left",
      type: "success",
      theme: "colored",
    });
  };

  return (
    <div className="w-full">
      {products &&
        products.map((item) => {
          return (
            <div key={item._id} className="car-card m-2 ">
              <div className="flex flex-col md:flex-row justify-between items-center object-contain ">
                <Image
                  src={item.thumbnail}
                  alt="thumbnail"
                  width={50}
                  height={50}
                  className="object-contain m-5"
                />
                <div>
                  <h2 className="card__content-title text-xl font-bold">
                    {item.title}
                  </h2>
                  <p className="card__content-subtitle text-lg ">
                    {item.description}
                  </p>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row">
                      <p className="text-lg font-bold">$</p>
                      <p className=" text-lg font-bold">{item.price}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p className=" text-lg font-bold">Quantity:</p>
                      <IconButton
                        source="/minusminus.png"
                        handleClick={() => decrementQuantity(item._id)}
                      />
                      <p className=" text-lg font-bold">{item.quantity}</p>
                      <IconButton
                        source="/plusplus.png"
                        handleClick={() => incrementQuantity(item._id)}
                      />
                    </div>
                    <IconButton
                      source="/Delete.png"
                      handleClick={() => handleDelete(item._id)}
                      styles="bg-white"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </div>
  );
};

export default CartProductCard;
