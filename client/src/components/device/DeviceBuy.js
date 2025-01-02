import React, { useContext } from "react";
import {
  HELP_ROUTE, SHOP_ROUTE,
  ABOUT_CARD1_ROUTE,
} from "../../utils/consts/routes";
import { Link } from "react-router-dom";
import location_pointer from "../../assets/location-pointer.svg";
import { formatGbCurrency } from "../../utils/dataFormat/currencies";
import { deviceBuyContainerFormatDate } from "../../utils/dataFormat/formatDate";
import { addToCart } from "../../utils/cart/addToCart";
import { Context } from "../..";



const DeviceBuy = ({device}) => {
    const { user, cart } = useContext(Context);
    const device_amount = 1;

  return (
    <div className="device__buy">
      <h4 className="dev-buy__price">
        Buy new <span>{formatGbCurrency(device.price || 0)}</span>
      </h4>
      <div className="dev-buy__delivery">
        <Link to={HELP_ROUTE}>FREE delivery</Link>{" "}
        <span className="dev-buy__del-date">
          {deviceBuyContainerFormatDate(Date.now() + 172800000)}
        </span>{" "}
        on your first order to UK or Ireland.{" "}
        <Link to={HELP_ROUTE}>Details</Link>
      </div>
      <div className="dev-buy__del-address">
        <Link to={HELP_ROUTE}>
          <img src={location_pointer} alt="address pointer"></img> Deliver to
          London W1U6SG
        </Link>
      </div>

      <div className="dev-buy__condition">
        New: Unused | <Link to={HELP_ROUTE}>FREE delivery</Link>{" "}
      </div>
      <div className="dev-buy__soldBy">
        Sold by <Link to={SHOP_ROUTE}>Amazon Resale</Link>
      </div>
      <div className="dev-buy__fulfilledBy">
        <Link to={ABOUT_CARD1_ROUTE}>Fulfilled by Amazon</Link>
      </div>
      <div className="dev-buy__buy-button">
        <button
          onClick={() => addToCart(cart, user, user.isAuth, cart.cartId, device.id, device_amount, user.user.id)}
          className="btn btn-warning device__button"
        >
          add to basket
        </button>
      </div>
    </div>
  );
};

export default DeviceBuy;
