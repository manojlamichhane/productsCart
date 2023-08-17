"use client";
import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface checkoutProduct {
  title: string;
  price: number;
  quantity: number;
}

const OrdersDetail = ({ products }: any) => {
  let sum = 0;
  products.map((item: any) => {
    const temp = item.quantity * item.price;
    sum = sum * 1 + temp;
  });

  const [loading, setLoading] = useState(false);

  const checkOutProducts = products.map((product: checkoutProduct) => {
    return {
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    };
  });

  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("api/auth/signin");
    },
  });

  const checkOutHandler = async () => {
    if (!session) {
      router.push("/api/auth/signin");
      alert("Please signin before checking out");
    } else {
      const headers = {
        Authorization: `Bearer ${session?.user?.token}`,
      };
      setLoading(true);
      const response = await axios.post(
        "https://products-odvc.onrender.com/ap1/v1/booking/checkout-session",
        checkOutProducts,
        { headers }
      );
      window.location.href = response.data.url;
      setLoading(false);
    }
  };

  return (
    <div className="order-detail-card m-2  max-w-full object-contain">
      <h2 className="card__content-title text-xl font-bold">Details</h2>
      <table className="divide-y divide-gray-200 w-full">
        <thead className="bg-gray-50 w-auto">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 text-xs text-center text-black uppercase "
            >
              Item
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-xs font-bold text-center text-black uppercase "
            >
              Quantity
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-xs font-bold text-center text-black uppercase "
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((item: any) => {
            return (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {item.quantity * item.price}
                </td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              Total
            </td>
            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
              {sum}
            </td>
          </tr>
        </tbody>
      </table>
      <CustomButton
        title={loading ? "Processing ..." : "Proceed to checkout"}
        containerStyles="bg-primary-blue text-white rounded-full mt-10 w-full"
        handleClick={checkOutHandler}
        btnType="button"
      />
    </div>
  );
};

export default OrdersDetail;
