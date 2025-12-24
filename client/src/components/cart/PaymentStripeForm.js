import React, { useState } from "react";
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';
import { ShoppingCart } from "lucide-react";
import { Spinner } from "../../shadcn/spinner";

const PaymentStripeForm = ({email}) => {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (checkoutState.type === 'loading')
    return <p>Loading payment...</p>;

  if (checkoutState.type === 'error')
    return <p>Error: {checkoutState.error.message}</p>;

  const { checkout, type } = checkoutState;

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await checkout.confirm({email});

    if (result.type === 'error') {
      setError(result.error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  return (
      <form onSubmit={onSubmitHandler} className='flex flex-col h-full gap-4'>
        <h4 className='text-semibold'>Payment</h4>
        <PaymentElement id="payment-element" />
        <button disabled={loading} id="submit" type='submit' className='flex justify-center items-center bg-gray-800 text-white gap-2 w-full p-2 mt-auto rounded-lg cursor-pointer'>
          {loading || type === 'loading' ? (
            <Spinner />
          ) : (
            <div className="flex justify-center items-center gap-4">Pay {checkout.total.total.amount} now <ShoppingCart className='w-4 h-4' /></div>
          )}
        </button> 
        {error && <div id="payment-message text-semibold">{error}</div>}
      </form>
  );
};

export default PaymentStripeForm;


