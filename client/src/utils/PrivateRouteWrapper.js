import React, { useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Context } from "..";
import { LOGIN_ROUTE } from "./consts/routes";

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const PrivateElement = ({ children }) => {
  let {pathname} = useLocation();
  const {user, history} = useContext(Context);

  useEffect(()=>{
    history.setAuthFrom(pathname);
  },[])
  // return children
  
  return user.isAuth ? (
    children
  ) : (
    <Navigate to={LOGIN_ROUTE}/>
  )
}

export default PrivateElement;