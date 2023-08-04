import AddToCart from "@/app/components/AddToCart";
import SearchParamTypes from "@/types/SearchParamTypes";
import formatPrice from "@/util/priceFormat";
import Image from "next/image";

export default function ProductPage({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-12">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="rounded-lg md:w-auto"
        priority={true}
      />
      <div className=" font-medium">
        <h1 className="text-2xl py-2 ">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>

        <p className="font-bold text-teal-500">
          {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
        </p>
        <AddToCart {...searchParams} />
      </div>
    </div>
  );
}
