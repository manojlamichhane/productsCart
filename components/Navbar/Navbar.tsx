import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const state: any = useSelector(
    (reduxState: { Cart: object }) => reduxState.Cart
  );

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo-social.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain w-auto h-auto"
          />
        </Link>
        <div className="flex flex-row">
          <Link href="/cart" className="relative inline-flex w-fit">
            {state.products.length > 0 ? (
              <div className="cart-badge">{state.products.length}</div>
            ) : null}
            <CustomButton
              title="Cart"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
          </Link>
          {session?.user ? (
            <Link href="/dashboard">
              <div className="flex flex-row items-center justify-start">
                <span className="text-primary-blue p-2">Dashboard</span>
                <div className=" bg-primary-blue rounded-full text-white py-2.5 px-3.5 ">
                  <>{session.user.name?.slice(0, 1)}</>
                </div>
              </div>
            </Link>
          ) : (
            <Link href="api/auth/signin" className="relative inline-flex w-fit">
              <CustomButton
                title="Sign In"
                btnType="button"
                containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
