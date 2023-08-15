"use client";
import { CustomInput, CustomButton, Loading } from "@/components";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./../Redux/hook";
import { signUp } from "./../Redux/features/auth/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const response = useAppSelector((reduxState) => reduxState.Auth);
  const [signingUp, setSigningUp] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: any) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSignuUp = async () => {
    setSigningUp(true);
    const res = await dispatch(signUp({ ...state }));

    if (res.meta.requestStatus === "fulfilled") {
      toast("Signed Up successfully!", {
        type: "success",
        position: "bottom-left",
        theme: "colored",
      });
    }
    setSigningUp(false);
  };

  return (
    <div className="signin-container">
      <div className=" bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 w-full">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-6 w-full">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl ">
            Sign Up
          </h1>
          <CustomInput
            label="Name"
            name="name"
            placeholder="User"
            value={state.name}
            handleChange={handleChange}
          />
          {response.error
            .slice(24, response.error.length - 1)
            .split(",")
            .map((item) =>
              item.includes("name") ? (
                <p key={item} className="text-red-500">
                  {item.split(":")[1]}
                </p>
              ) : null
            )}
          <CustomInput
            label="Email"
            name="email"
            placeholder="user@user.com"
            value={state.email}
            handleChange={handleChange}
          />
          {response.error
            .slice(24, response.error.length - 1)
            .split(",")
            .map((item) => {
              if (item.includes("valid")) {
                return (
                  <p key={item} className="text-red-500">
                    {item.split(":")[1]}
                  </p>
                );
              }
              if (item.includes("dup key")) {
                return (
                  <p key={item} className="text-red-500">
                    There is already an account with this email. Please try
                    another one
                  </p>
                );
              }
            })}
          <CustomInput
            label="Password"
            name="password"
            placeholder="***********"
            value={state.password}
            handleChange={handleChange}
          />
          {response.error
            .slice(24, response.error.length - 1)
            .split(",")
            .map((item) =>
              item.includes("password") ? (
                <p key={item} className="text-red-500">
                  {item.split(":")[1]}
                </p>
              ) : null
            )}

          <CustomInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="***********"
            value={state.confirmPassword}
            handleChange={handleChange}
          />

          <CustomButton
            title={signingUp ? "Signing up..." : "Sign Up"}
            containerStyles="bg-primary-blue text-white rounded-full mt-10 w-full"
            handleClick={handleSignuUp}
            btnType="button"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
