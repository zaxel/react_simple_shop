import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import { getCart } from "./http/cartAPI";
import { Spinner } from "react-bootstrap";
import { isSuperUser } from "./utils/isSuperUser";


const App = observer(() => {
  const { user, cart } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const userData = await check();
      user.setUser(userData);
      user.setIsAuth(true);
      user.setIsSuperUser(isSuperUser(userData.role));
      

      const cartData = await getCart(user.user.id);
      cart.setCart(cartData.rows)
      cart.setItemsCount(cartData.count)

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }

  }, [])

  // useEffect(()=>{
  //     check()
  //     .then(data=>{
  //       user.setUser(data);
  //       user.setIsAuth(true);
  //       user.setIsSuperUser(isSuperUser(data.role));
  //   })
  //     .finally(()=>setLoading(false));
  // }, [])

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
