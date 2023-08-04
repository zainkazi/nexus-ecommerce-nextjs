"use client";

import { useCartStore } from "@/store";
import { AddCartTypes } from "@/types/AddCartTypes";
import { SearchParams } from "@/types/SearchParamTypes";
import { useState } from "react";

const AddToCart = ({
  id,
  name,
  image,
  unit_amount,
  quantity,
}: AddCartTypes) => {
  const { addProduct } = useCartStore();
  const [adding, setAdding] = useState(false);

  return (
    <button
      onClick={() => {
        addProduct({ id, image, unit_amount, quantity, name });
        setAdding(true);
        setTimeout(() => {
          setAdding(false);
        }, 400);
      }}
      disabled={adding}
      className="my-6 md:my-12 text-white py-2 w-full px-6 font-medium rounded-md bg-teal-700 disabled:opacity-25"
    >
      {adding ? "Adding to cart..." : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
