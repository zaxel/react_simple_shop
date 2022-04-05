import React, { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";

/**
 * A wrapper around the element which checks if the user is authenticated
 * If authenticated, renders the passed element
 * If not authenticated, redirects the user to Login page.
 */
const PrivateElement = ({ children }) => {
  let location = useLocation();
  const {user} = useContext(Context);
  return user.isAuth ? (
    children
  ) : (
    <Navigate to={LOGIN_ROUTE} state={{ from: location }} />
  )
}

export default PrivateElement