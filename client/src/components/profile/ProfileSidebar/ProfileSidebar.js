import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '../../../shadcn/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../../../shadcn/avatar';
import { Clipboard, Handbag, Heart, Home, } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE_ADDRESS_ROUTE, PROFILE_INFO_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_WISHLIST_ROUTE } from '../../../utils/consts/routes';
import DropDownMenu from './DropDownMenu';

const items = [
    {
        title: "Info",
        icon: Clipboard,
        route: PROFILE_INFO_ROUTE
    },
    {
        title: "Address",
        icon: Home,
        route: PROFILE_ADDRESS_ROUTE,
    },
    {
        title: "Orders",
        icon: Handbag,
        route: PROFILE_ORDERS_ROUTE,
    },
    {
        title: "Wish List",
        icon: Heart,
        route: PROFILE_WISHLIST_ROUTE,
    }
]

const ProfileSidebar = () => {
   
    return (
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader className='px-0'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton inactive="true">
                            <Avatar className='size-6'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span>Michael Brown</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup >
                    <SidebarGroupLabel>Profile</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.route}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropDownMenu />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    );
};

export default ProfileSidebar;