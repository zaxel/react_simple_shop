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

  useEffect(() => {
    const fetchData = async()=> {
      try {
        const fetchArr = [check(), getCart(9)]
        const promises = await Promise.all(fetchArr);

        user.setUser(promises[0]);
        user.setIsAuth(true);
        user.setIsSuperUser(isSuperUser(promises[0].role));
        console.log(promises[1])
  
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
    

  }, [])

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
