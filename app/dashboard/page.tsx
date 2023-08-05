import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { prisma } from "@/prisma/db";
import formatPrice from "@/util/priceFormat";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(options);
  if (!user) return null;

  return await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null) return <h1>You must be logged in to view the orders</h1>;

  if (orders.length === 0) return <h1>No orders yet</h1>;

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg p-8 my-4 space-y-2 bg-base-200"
        >
          <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
          <p className="text-xs">
            Status:
            <span
              className={`${
                order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
              } text-white py-1 rounded-md px-2 mx-2 text-xs`}
            >
              {order.status}
            </span>
          </p>

          <p className="text-xs">
            Time: {new Date(order.createdAt).toString()}
          </p>
          <div className="text-sm lg:flex items-center gap-4">
            {order.products.map((product) => (
              <div className="py-2" key={product.id}>
                <h2 className="py-2">{product.name}</h2>
                <div className="flex items-baseline gap-4">
                  <Image
                    src={product.image!}
                    width={36}
                    height={36}
                    alt={product.name}
                    quality={20}
                    priority={true}
                    className="w-auto"
                  />
                  <p>{formatPrice(product.unit_amount)}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="font-medium py-2">Total: {formatPrice(order.amount)}</p>
        </div>
      ))}
    </div>
  );
}
