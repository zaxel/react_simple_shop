import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resolveBySession } from "../http/orderAPI";
import { Spinner } from "../shadcn/spinner";
import { PROFILE_ORDERS_ROUTE } from "../utils/consts/routes";
import { Context } from "..";
import { clearLocalStoreCartSnapshot } from "../utils/cart/localStoreCartSnapshot";

function OrderCompletePage() {
  const { cart } = useContext(Context);
  const MAX_ATTEMPTS = 6;
  const POLL_INTERVAL = 1500;
  const [status, setStatus] = useState('LOADING');
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  let attempts = 0;
  let timeoutId = null;

  useEffect(() => {
    if (!sessionId) return;

    const checkStatus = async () => {
      try {
        const res = await resolveBySession({sessionId}); 
        setStatus(res.status);

        if (res.status === 'PAID') {
          cart.clearCart(true);
          clearLocalStoreCartSnapshot();
          setTimeout(() => navigate(PROFILE_ORDERS_ROUTE), 2000);
          return;
        }

        if (res.status === 'FAILED')
          return; // stop polling
        
        if (res.status === 'PENDING' && attempts < MAX_ATTEMPTS) {
          attempts++;
          timeoutId = setTimeout(checkStatus, POLL_INTERVAL);
        }
      } catch {
        setStatus('ERROR');
      }
    };

    checkStatus();

    return () => clearTimeout(timeoutId);
  }, [sessionId, navigate]);

  return <div className="flex-auto flex justify-center items-center text-xl font-medium h-[92dvh]">
    {(status === 'LOADING')
      ? <div className="flex justify-center items-center gap-4"><Spinner className="w-5 h-5"/> <div>Checking payment status…</div></div>
      : (status === 'PAID')
        ? <div>Payment successful. Redirecting…</div>
        : (status === 'PAYMENT_FAILED')
          ? <div>Payment failed. You can retry from your orders.</div>
          : <div>Something went wrong.</div>} 
  </div>
}

export default OrderCompletePage;




