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
      disabled={false}
      type={btnType}
      data-testid="button"
      onClick={handleClick}
      className={`custom-btn ${containerStyles}`}
    >
      <span>{title}</span>
    </button>
  );
};

export default CustomButton;
