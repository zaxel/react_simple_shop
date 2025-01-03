import React, { useContext } from "react";
import { Context } from "../..";
import { addToCart } from "../../utils/cart/addToCart";
import no_image from "../../assets/no-image.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts/routes";
import { formatGbCurrency } from "../../utils/dataFormat/currencies";
import RateItem from "../device/RateItem";

const SponsoredItem = ({ el }) => {
  const { user, cart } = useContext(Context);
  const device_amount = 1;
  const navigate = useNavigate();

  const onAddToCartPressed = () => {
    addToCart(
      cart,
      user,
      user.isAuth,
      cart.cartId,
      el.id,
      device_amount,
      user.user.id
    );
  };
  console.log(el);
  return (
    <div className="basket-sponsored">
      <div className="basket-sponsored__img">
        <img
          onClick={() => navigate(DEVICE_ROUTE + "/" + el.id)}
          src={el.img?.[0]?.thumb?.url || no_image}
          alt={`basket item ${el.name}`}
        />
      </div>
      <div className="basket-sponsored__descr-cont">
        <h4 onClick={() => navigate(DEVICE_ROUTE + "/" + el.id)}>{el.name}</h4>
        <div className="basket-sponsored__star">
          <RateItem rate={el.rate} />
        </div>
        <h5>{formatGbCurrency(el.price)}</h5>
        <Button
          onClick={onAddToCartPressed}
          variant="warning"
          className="basket-aside__button"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default SponsoredItem;
