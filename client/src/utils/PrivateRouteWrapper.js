import React, { useContext } from "react" 
import { Navigate } from "react-router-dom"
import { Context } from "..";
import { LOGIN_ROUTE } from "./consts/routes";


const PrivateElement = ({ children }) => {
  const {user } = useContext(Context);
  
  return user.isAuth ? (
    children
  ) : (
    <Navigate to={LOGIN_ROUTE}/>
  )
}

export default PrivateElement;