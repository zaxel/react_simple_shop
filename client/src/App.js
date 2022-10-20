import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import { setUserIfAuth } from "./utils/setUserIfAuth";
import { fetchSetCart, setCartId } from "./utils/cart/fetchSetCart";
import { setCartFromLocalStore } from "./utils/cart/setLocalStoreCart";
import Footer from "./components/Footer";
import ShopToolTip from "./components/ShopToolTip";
import { isActivated } from "./utils/check/isActivated";
import { fetchFaqCategory } from "./utils/staticPages/helpPage";


const App = observer(() => {
  const { user, cart, helpPage } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        !user.isAuth && setCartFromLocalStore(cart);
        await setUserIfAuth(user);
        await setCartId(cart, user);
        await fetchSetCart(user, cart);
        // await fetchFaqCategory(helpPage); 
        cart.setCartTotal();
        isActivated(user);
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    })()
  }, []) 

  if (loading) {
    return (
      <div className="spinner spinner__shop">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
      <ShopToolTip />
    </BrowserRouter>
  );
});

export default App;
