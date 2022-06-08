import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Protected from "./pages/Protected";
import AccountPage from "./pages/AccountPage";
import Sample from "./pages/Sample";
import CheckoutPage from "./pages/CheckoutPage";

import UserDelivery from "./components/userProfileComponents/UserDelivery";
import UserInfo from "./components/userProfileComponents/UserInfo";
import UserPayment from "./components/userProfileComponents/UserPayment";
import UserOrders from "./components/userProfileComponents/UserOrders";
import UserAccountRouter from "./components/userProfileComponents/UserAccountRouter";

import OrdersAdminPanel from "./components/adminPanelComponents/orders/OrdersAdminPanel";
import UsersAdminPanel from "./components/adminPanelComponents/users/UsersAdminPanel";
import DevicesAdminPanel from "./components/adminPanelComponents/DevicesAdminPanel";
import TypesAdminPanel from "./components/adminPanelComponents/TypesAdminPanel";
import BrandsAdminPanel from "./components/adminPanelComponents/BrandsAdminPanel";
import AdminPanelRouter from "./components/adminPanelComponents/AdminPanelRouter";

import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, ABOUT_ROUTE, CONTACT_ROUTE,
        LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE, ERROR_ROUTE, 
        ACCOUNT_ROUTE, PROTECTED_ROUTE, SAMPLE_ROUTE, CHECKOUT_ROUTE,
        ACCOUNT_INFO_ROUTE, ACCOUNT_DELIVERY_ROUTE, ACCOUNT_PAYMENT_ROUTE, ACCOUNT_ORDERS_ROUTE,
        ADMIN_USER_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_BRANDS_ROUTE } from "./utils/consts";


export const userNavRoutes = [
    {
        path: ACCOUNT_INFO_ROUTE,
        Component: UserInfo
    },
    {
        path: ACCOUNT_DELIVERY_ROUTE,
        Component: UserDelivery
    },
    {
        path: ACCOUNT_PAYMENT_ROUTE,
        Component: UserPayment
    },
    {
        path: ACCOUNT_ORDERS_ROUTE,
        Component: UserOrders
    },
    
];




export const adminNavRoutes = [
    {
        path: ADMIN_USER_ROUTE,
        Component: UsersAdminPanel
    },
    {
        path: ADMIN_ORDERS_ROUTE,
        Component: OrdersAdminPanel
    },
    {
        path: ADMIN_DEVICES_ROUTE,
        Component: DevicesAdminPanel
    },
    {
        path: ADMIN_TYPES_ROUTE,
        Component: TypesAdminPanel
    },
    {
        path: ADMIN_BRANDS_ROUTE,
        Component: BrandsAdminPanel
    },
    
];
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        NestedComponent: AdminPanelRouter
    },
    {
        path: SAMPLE_ROUTE,
        Component: Sample
    },
    
];
export const authRoutes = [
    {
        path: CHECKOUT_ROUTE,
        Component: CheckoutPage
    },
    {
        path: ACCOUNT_ROUTE,
        Component: AccountPage,
        NestedComponent: UserAccountRouter
    },
    {
        path: PROTECTED_ROUTE,
        Component: Protected
    },
    
];
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: CONTACT_ROUTE,
        Component: Contacts
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
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
];
