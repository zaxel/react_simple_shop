import React, { useContext } from 'react';
import { Context } from '../../..';
import { Link, useNavigate } from 'react-router-dom';
import { logoutOnClient, logoutOnServer } from '../../../utils/logout';
import { HELP_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../../utils/consts/routes';
import { SimpleDropdown, SimpleDropdownItem, SimpleDropdownSeparator } from '../../../shadcn/simpledropdown';
import { SidebarMenuButton, useSidebar } from '../../../shadcn/sidebar';
import { ChevronUp, HelpCircle, LogOut, ShoppingBag, User2 } from 'lucide-react';
const dropMenuItems = [
    {
        title: "Back To Shopping",
        icon: ShoppingBag,
        route: SHOP_ROUTE,
    },
    {
        title: "Help",
        icon: HelpCircle,
        route: HELP_ROUTE,
    },
]


const DropDownMenu = () => {
    const { cart, user, device } = useContext(Context);
    const navigate = useNavigate();
    const { open } = useSidebar();

    const onLogoutPressed = () => {
        logoutOnClient(cart, user);
        logoutOnServer();
        navigate(LOGIN_ROUTE);
    }
    return (
        <SimpleDropdown
            align="end"
            disabled={!open}
            trigger={
                <SidebarMenuButton>
                    <User2 />
                    <span>Michael Brown</span>
                    <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
            }
        >
            {dropMenuItems.map((item) => {
                return <SimpleDropdownItem className='size-6'>
                    <Link to={item.route} className='hover:text-gray-700'>
                        <div className='flex items-center gap-2'>
                            <item.icon className='w-5 h-5' /> <span>{item.title}</span>
                        </div>
                    </Link>
                </SimpleDropdownItem>
            })}
            <SimpleDropdownSeparator />
            <SimpleDropdownItem asChild>
                <button onClick={() => onLogoutPressed()}>
                    <div className='flex items-center gap-2 text-red-500'>
                        <LogOut className='w-5 h-5' /> <span>Log Out</span>
                    </div>
                </button>
            </SimpleDropdownItem>
        </SimpleDropdown>
    );
};

export default DropDownMenu;