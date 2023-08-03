import Image from "next/image";
import formatPrice from "@/util/priceFormat";
import ProductTypes from "@/types/ProductTypes";
import Link from "next/link";

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductTypes) {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { id, name, image, unit_amount, description, features },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          priority={true}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-500">
            {unit_amount !== null ? formatPrice(unit_amount as number) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
}
