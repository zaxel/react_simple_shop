import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../shadcn/sidebar';
import { Clipboard, Handbag, Heart, Home} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE_ADDRESS_ROUTE, PROFILE_INFO_ROUTE, PROFILE_ORDERS_ROUTE, PROFILE_WISHLIST_ROUTE } from '../../utils/consts/routes';

const items = [
    {
        title: "Info",
        url: "#",
        icon: Clipboard,
        route: PROFILE_INFO_ROUTE
    },
    {
        title: "Address",
        url: "#",
        icon: Home,
        route: PROFILE_ADDRESS_ROUTE,
    },
    {
        title: "Orders",
        url: "#",
        icon: Handbag,
        route: PROFILE_ORDERS_ROUTE,
    },
    {
        title: "Wish List",
        url: "#",
        icon: Heart,
        route: PROFILE_WISHLIST_ROUTE,
    }
]

const ProfileSidebar = () => {
    return (
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader >
                <div>header</div>
            </SidebarHeader>
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
            <SidebarFooter>
                <div>footer</div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default ProfileSidebar;