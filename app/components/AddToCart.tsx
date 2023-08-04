"use client";

import { useCartStore } from "@/store";
import { SearchParams } from "@/types/SearchParamTypes";
import { useState } from "react";

const AddToCart = ({
  id,
  name,
  image,
  unit_amount,
  quantity,
}: SearchParams) => {
  const { addProduct } = useCartStore();

  return (
    <button
      onClick={() => {
        addProduct({ id, image, unit_amount, quantity, name });
      }}
      className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700 disabled:opacity-25"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
