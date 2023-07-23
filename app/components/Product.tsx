import Image from "next/image";
import formatPrice from "@/util/priceFormat";
import ProductTypes from "@/types/ProductTypes";

export default function Product({ name, image, price }: ProductTypes) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      <p>{price !== null ? formatPrice(price as number) : "N/A"}</p>
    </div>
  );
}
