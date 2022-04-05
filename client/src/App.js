import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { isSuperUser } from "./utils/isSuperUser";


const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      check()
      .then(data=>{
        user.setUser(data);
        user.setIsAuth(true);
        user.setIsSuperUser(isSuperUser(data.role));
    })
      .finally(()=>setLoading(false));
  }, [])

  if(loading){
    return (
      <div className="spinner">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
