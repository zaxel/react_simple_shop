﻿import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";
import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE, ERROR_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
];
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: ERROR_ROUTE,
        Component: ErrorPage
    },
];