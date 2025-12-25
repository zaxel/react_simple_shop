import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/header/Header";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import { checkAuth } from "./utils/checkAuth";
import Footer from "./components/Footer";
import ShopToolTip from "./components/ShopToolTip";
import { isActivated } from "./utils/check/isActivated";
import { setUserData } from "./utils/setUserData";
import setWishList from "./utils/setWishList";


const App = observer(() => {
  const { user, cart, history } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await cart.setCart();  
        const authUser = await checkAuth(user); //err if no auth
        await setUserData(user, authUser);
        await setWishList(user, history);
        isActivated(user);
      } catch (e) {
        console.log(e.message)
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
      <Header />
      <AppRouter />
      <Footer />
      <ShopToolTip />
    </BrowserRouter>
  );
});

export default App;
