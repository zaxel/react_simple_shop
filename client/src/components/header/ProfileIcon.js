import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, SHOP_ROUTE, HELP_ROUTE } from '../../utils/consts/routes';
import { HelpCircle, LogOut, Settings, ShoppingBag, TableProperties } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { logoutOnClient, logoutOnServer } from '../../utils/logout';
import { Context } from '../..';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../shadcn/dropdown';

const ProfileIcon = () => {
    const { cart, user } = useContext(Context);
    const firstName = user.user?.name || "";
    const surName = user.user?.surname || "";
    const userFullName = (!firstName && !surName) ? "User" : `${firstName} ${surName}`;
    const initials = `${firstName[0] || ''}${surName[0] || ''}` || 'U';
    const navigate = useNavigate();

    const dropMenuItems = [
        {
            title: "Profile",
            icon: TableProperties,
            route: PROFILE_ROUTE,
        },
        {
            title: "Admin Panel",
            icon: Settings,
            route: ADMIN_ROUTE,
            adminOnly: true
        },
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

    const onLogoutPressed = () => {
        logoutOnServer();
        logoutOnClient(cart, user);
        navigate(LOGIN_ROUTE);
    }

   return (
    <DropdownMenu >
        <DropdownMenuTrigger>
            <Avatar className='cursor-pointer size-6'>
                <AvatarImage src="https://github.com/zaxel.png" />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            className="bg-navbar-background text-navbar-text rounded-md p-2 space-y-1"
            side="bottom"
            sideOffset={15}
            align="end"
        >
            {dropMenuItems.map((item) => {
                return !user.isSuperUser && item.adminOnly
                    ? null
                    : <DropdownMenuItem 
                        asChild 
                        key={item.title} 
                      >
                        <Link to={item.route} className='hover:text-navbar-text-hover'>
                            <div className='flex items-center gap-2'>
                                <item.icon className='w-5 h-5' /> 
                                <span>{item.title}</span>
                            </div>
                        </Link>
                      </DropdownMenuItem>
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onLogoutPressed()}>
                <LogOut className='w-5 h-5 text-red-500' /> 
                <span>Log Out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
};

export default ProfileIcon;