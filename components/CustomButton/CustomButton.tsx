"use client";
import { CustomButtonProps } from "@/types";
import React from "react";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
}: CustomButtonProps) => {
  return (
    <button
      className={`custom-btn hover:bg-white hover:text-blue-600 ${containerStyles}`}
      disabled={false}
      type={btnType}
      data-testid="button"
      onClick={handleClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default CustomButton;
