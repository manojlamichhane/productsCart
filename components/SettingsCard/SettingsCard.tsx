"use client";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UpdateMe } from "../../app/Redux/features/auth/userSlice";
import { useAppDispatch } from "../../app/Redux/hook";
import CustomInput from "../CustomInput/CustomInput";

const SettingsCard = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: [e.target.value] });
  };
  const data = {
    ...state,
    token: session?.user.token,
  };
  const updateHandler = async (data: any) => {
    const response = await dispatch(UpdateMe(data));
    if (response.meta.requestStatus === "fulfilled") {
      signOut();
    }
  };

  useEffect(() => {
    if (session) {
      setState({
        name: session?.user?.name,
        email: session?.user?.email,
      });
    }
  }, []);

  return (
    <div className="flex flex-col bg-grey  justify-center items-center w-full">
      <div className="p-5 w-full">
        <CustomInput
          label="Name"
          placeholder="User"
          name="name"
          value={state.name}
          handleChange={handleChange}
        />
      </div>
      <div className="p-5 w-full">
        <CustomInput
          label="Email"
          placeholder="user@user.com"
          name="email"
          value={state.email}
          handleChange={handleChange}
        />
      </div>
      <div className="p-5 w-full">
        <CustomButton
          title="Update details"
          containerStyles="bg-primary-blue text-white rounded-full w-full "
          handleClick={() => updateHandler(data)}
          btnType="button"
        />
      </div>
    </div>
  );
};

export default SettingsCard;
