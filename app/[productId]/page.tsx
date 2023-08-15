"use client";
import React, { useEffect } from "react";
import { fetchById } from "../Redux/features/Products/productsSlice";
import { useAppSelector, useAppDispatch } from "./../Redux/hook";

import { DetailsCard, Loading } from "@/components";

type propsParams = {
  params: {
    productId: string;
  };
};

const Details = (props: propsParams) => {
  const dispatch = useAppDispatch();
  const response = useAppSelector((reduxState) => reduxState.products);

  const fetchProduct = async () => {
    dispatch(fetchById(props.params.productId));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex-1 pt-32 padding-x">
      {response.loading ? (
        <Loading />
      ) : (
        <DetailsCard product={response.selectedProduct} />
      )}
    </div>
  );
};

export default Details;
