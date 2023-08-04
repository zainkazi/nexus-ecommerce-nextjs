import { AddCartTypes } from "@/types/AddCartTypes";

const calculateOrderAmount = (items: AddCartTypes[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity;
  }, 0);
  return totalPrice;
};

export default calculateOrderAmount;
