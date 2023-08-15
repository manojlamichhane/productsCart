import React from "react";

const CustomInput = (props: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: any;
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black ">
        {props.label}
      </label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        data-testid="input"
        value={props.value}
        onChange={props.handleChange}
        className=" border border-gray-300 text-black sm:text-sm rounded-lg  block w-full p-2.5 "
        placeholder={props.placeholder}
        required={true}
      />
    </div>
  );
};

export default CustomInput;
