import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/about/About";
import Protected from "./pages/Protected";
import AccountPage from "./pages/AccountPage";
import Sample from "./pages/Sample";
import CheckoutPage from "./pages/CheckoutPage";

import Help from "./pages/help/Help";
import HelpCatPage from "./components/help/subPages/HelpCatPage";
import HelpRouter from "./components/help/HelpRouter";

import WhoWe from "./pages/about/WhoWe";
import Experience from "./pages/about/Experience";
import TheBrands from "./pages/about/TheBrands";

import Delivery from "./components/userProfile/Delivery";
import Info from "./components/userProfile/Info";
import Payment from "./components/userProfile/Payment";
import Orders from "./components/userProfile/Orders";
import AccountRouter from "./components/userProfile/AccountRouter";

import OrdersAdminPanel from "./components/adminPanel/orders/OrdersAdminPanel";
import UsersAdminPanel from "./components/adminPanel/users/UsersAdminPanel";
import DevicesAdminPanel from "./components/adminPanel/devices/DevicesAdminPanel";
import TypesAdminPanel from "./components/adminPanel/types/TypesAdminPanel";
import BrandsAdminPanel from "./components/adminPanel/brands/BrandsAdminPanel";
import PagesAdminPanel from "./components/adminPanel/pages/PagesAdminPanel";
import AdminPanelRouter from "./components/adminPanel/AdminPanelRouter";

import PagesPanelRouter from "./components/adminPanel/pages/PagesPanelRouter";
import AppAdmin from "./components/adminPanel/pages/ourApps/AppAdmin";
import HelpAdmin from "./components/adminPanel/pages/help/HelpAdmin"; 

import HelpAdminFaq from "./components/adminPanel/pages/help/HelpAdminFaq"; 
import HelpAdminCat from "./components/adminPanel/pages/help/HelpAdminCat"; 
import HelpAdminCatManger from "./components/adminPanel/pages/help/HelpAdminCatManger"; 

import AboutAdmin from "./components/adminPanel/pages/about/AboutAdmin";
import Buttons from "./components/adminPanel/pages/about/Buttons";
import Blocks from "./components/adminPanel/pages/about/Blocks";
import LeftCard from "./components/adminPanel/pages/about/LeftCard";
import MiddleCard from "./components/adminPanel/pages/about/MiddleCard";
import RightCard from "./components/adminPanel/pages/about/RightCard";

import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, ABOUT_ROUTE, HELP_ROUTE,
        LOGIN_ROUTE, REGISTRATION_ROUTE, DEVICE_ROUTE, ERROR_ROUTE, 
        ACCOUNT_ROUTE, PROTECTED_ROUTE, SAMPLE_ROUTE, CHECKOUT_ROUTE,
        ACCOUNT_INFO_ROUTE, ACCOUNT_DELIVERY_ROUTE, ACCOUNT_PAYMENT_ROUTE, ACCOUNT_ORDERS_ROUTE,
        ADMIN_USER_ROUTE, ADMIN_ORDERS_ROUTE, ADMIN_DEVICES_ROUTE, ADMIN_TYPES_ROUTE, ADMIN_BRANDS_ROUTE, 
        ABOUT_CARD1_ROUTE, ABOUT_CARD2_ROUTE, ABOUT_CARD3_ROUTE, HELP_DELIVERY_ROUTE, HELP_RETURNS_ROUTE,
        HELP_ORDER_ROUTE, HELP_STOCK_ROUTE, HELP_TECH_ROUTE, HELP_MAIN_ROUTE, HELP_TECH_ADMIN_ROUTE, 
        HELP_PAYMENT_ROUTE, ADMIN_PAGES_ROUTE, ADMIN_APP_ROUTE, ADMIN_HELP_ROUTE, ADMIN_ABOUT_ROUTE,
        ABOUT_BUTTONS_ROUTE, ABOUT_BLOCKS_ROUTE, ABOUT_LEFT_CARD_ROUTE, ABOUT_MIDDLE_CARD_ROUTE, ABOUT_RIGHT_CARD_ROUTE,
        ADMIN_HELP_FAQ_ROUTE, ADMIN_HELP_CAT_ROUTE, ADMIN_HELP_MANAGER_ROUTE} from "./utils/consts/routes";



        

export const userNavRoutes = [
    {
        path: ACCOUNT_INFO_ROUTE,
        Component: Info
    },
    {
        path: ACCOUNT_DELIVERY_ROUTE,
        Component: Delivery
    },
    {
        path: ACCOUNT_PAYMENT_ROUTE,
        Component: Payment
    },
    {
        path: ACCOUNT_ORDERS_ROUTE,
        Component: Orders
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
    {
        path: ADMIN_PAGES_ROUTE,
        Component: PagesAdminPanel,
        NestedComponent: PagesPanelRouter
    },
    
];
export const adminPagesRoutes = [
    {
        path: ADMIN_APP_ROUTE,
        Component: AppAdmin
    },
    {
        path: ADMIN_HELP_ROUTE,
        Component: HelpAdmin
    },


    {
        path: ADMIN_HELP_FAQ_ROUTE,
        Component: HelpAdminFaq
    },
    {
        path: ADMIN_HELP_CAT_ROUTE,
        Component: HelpAdminCat
    },
    {
        path: ADMIN_HELP_MANAGER_ROUTE,
        Component: HelpAdminCatManger
    },



    {
        path: ADMIN_ABOUT_ROUTE,
        Component: AboutAdmin
    },
    {
        path: ABOUT_BUTTONS_ROUTE,
        Component: Buttons
    },
    {
        path: ABOUT_BLOCKS_ROUTE,
        Component: Blocks
    },
    {
        path: ABOUT_LEFT_CARD_ROUTE,
        Component: LeftCard
    },
    {
        path: ABOUT_MIDDLE_CARD_ROUTE,
        Component: MiddleCard
    },
    {
        path: ABOUT_RIGHT_CARD_ROUTE,
        Component: RightCard
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
        NestedComponent: AccountRouter
    },
    {
        path: PROTECTED_ROUTE,
        Component: Protected
    },
];
export const helpRoutes = [
    
    {
        path: HELP_MAIN_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_DELIVERY_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_RETURNS_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_ORDER_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_STOCK_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_PAYMENT_ROUTE,
        Component: HelpCatPage
    },
    {
        path: HELP_TECH_ROUTE,
        Component: HelpCatPage,
    },

    {
        path: HELP_TECH_ADMIN_ROUTE,
        Component: HelpCatPage,
    },
]
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
        path: ABOUT_CARD1_ROUTE,
        Component: WhoWe
    },
    {
        path: ABOUT_CARD2_ROUTE,
        Component: TheBrands
    },
    {
        path: ABOUT_CARD3_ROUTE,
        Component: Experience
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
    {
        path: HELP_ROUTE,
        Component: Help,
        NestedComponent: HelpRouter
    },
];
