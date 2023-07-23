import Image from "next/image";
import formatPrice from "@/util/priceFormat";
import ProductTypes from "@/types/ProductTypes";

export default function Product({ name, image, price }: ProductTypes) {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        alt={name}
        width={400}
        height={400}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="font-medium py-2">
        <h1>{name}</h1>
        <h2 className="text-sm text-teal-700">
          {price !== null ? formatPrice(price as number) : "N/A"}
        </h2>
      </div>
    </div>
  );
}
