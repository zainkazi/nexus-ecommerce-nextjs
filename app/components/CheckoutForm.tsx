import { useCartStore } from "@/store";
import formatPrice from "@/util/priceFormat";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const { cart, setCheckout } = useCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity,
    0
  );
  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          setCheckout("success");
        }
        setLoading(false);
      });
  };

  return (
    <form className="text-gray-600" onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold">Total: {formattedPrice}</h1>
      <button
        className={`py-2 mt-4 w-full bg-teal-700 rounded-md text-white disabled:opacity-25`}
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing...</span> : <span>Pay now</span>}
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
