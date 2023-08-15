"use client";
import { CustomButton, CustomInput, IconButton } from "@/components";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await signIn("credentials", {
      redirect: false,
      email: state.userName,
      password: state.password,
    }).then(({ ok, error }: any) => {
      setLoading(false);
      if (ok && error == null) {
        router.push("/cart");
      } else {
        setError(error);
      }
    });
  };

  return (
    <>
      <div className="signin-container">
        {loading ? (
          <Image
            src="/Loading_icon.gif"
            alt="loading"
            width={450}
            height={450}
            className="object-contain"
          />
        ) : (
          <div className=" bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl ">
                Sign in to your account
              </h1>
              <CustomInput
                label="Your email"
                name="userName"
                placeholder="user@user.com"
                value={state.userName}
                handleChange={handleChange}
              />
              <div>
                <label className="block mb-2 text-sm font-medium text-black ">
                  Password
                </label>

                <div className="flex flex-row justify-between items-center border border-gray-300 text-black sm:text-sm rounded-lg block w-full block w-full">
                  <input
                    type={seePassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={state.password}
                    onChange={handleChange}
                    className=" text-black sm:text-sm w-full p-2.5 rounded-lg outline-none"
                    placeholder="••••••••"
                    required={true}
                  />
                  <IconButton
                    styles="w-7 h-7"
                    source={
                      seePassword ? "/hidePassword.png" : "/showPassword1.png"
                    }
                    handleClick={() => setSeePassword(!seePassword)}
                  />
                </div>
              </div>
              {error ? <p className="text-red-600 font-bold">{error}</p> : null}
              <CustomButton
                title="Sign in"
                containerStyles="bg-primary-blue text-white rounded-full mt-10 w-full"
                handleClick={loginHandler}
                btnType="button"
              />
              <p className="text-sm  text-black  flex flex-row items-center">
                Don’t have an account yet?
                <Link href="/signup">
                  <CustomButton
                    title="Sign up"
                    containerStyles="bg-white text-black rounded-full"
                    //   handleClick={scrollHandler}
                    btnType="button"
                  />
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
