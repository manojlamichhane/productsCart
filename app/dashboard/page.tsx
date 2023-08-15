"use client";
import { ConfirmedOrders, Loading, SettingsCard } from "@/components";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { fetchAllOrders } from "../Redux/features/Products/orderSlice";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("settings");
  const dispatch = useAppDispatch();
  const orderList = useAppSelector((reduxState) => reduxState.Order);
  const { loading, orders, error } = orderList;
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  const signOutHandler = () => {
    signOut();
  };

  const fetchMyOrders = async () => {
    if (session) {
      await dispatch(fetchAllOrders(session));
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <main className="overflow-hidden">
      <div className="flex mt-36 padding-x  border-r-4 ">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col max-w-full ">
            <div>
              <button
                onClick={() => setSelectedOption("settings")}
                type="button"
                className={
                  selectedOption === "myOrders"
                    ? " custom-btn bg-white hover:bg-primary-blue text-black-100 font-bold w-full"
                    : " custom-btn bg-primary-blue hover:bg-primary-blue text-black-100 font-bold w-full"
                }
              >
                <p className="m-0">Settings</p>
                <Image
                  src="/setting.png"
                  alt="setting"
                  width={20}
                  height={20}
                  className="object-contain m-2"
                />
              </button>
              <button
                onClick={() => setSelectedOption("myOrders")}
                type="button"
                className={
                  selectedOption === "settings"
                    ? " custom-btn bg-white hover:bg-primary-blue text-black-100 font-bold w-full"
                    : " custom-btn bg-primary-blue hover:bg-primary-blue text-black-100 font-bold w-full"
                }
              >
                <p className="m-0">My Orders</p>
                <Image
                  src="/orderList.png"
                  alt="setting"
                  width={20}
                  height={20}
                  className="object-contain m-2"
                />
              </button>
              <button
                onClick={signOutHandler}
                type="button"
                className=" custom-btn bg-white hover:bg-primary-blue text-black-100 font-bold w-full"
              >
                <p className="m-0">Sign Out</p>
                <Image
                  src="/logout.png"
                  alt="setting"
                  width={20}
                  height={20}
                  className="object-contain m-2"
                />
              </button>
            </div>
          </div>
          {selectedOption === "settings" ? (
            <SettingsCard />
          ) : loading ? (
            <Loading />
          ) : (
            <ConfirmedOrders orders={orders} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
