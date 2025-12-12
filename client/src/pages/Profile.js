import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../shadcn/sidebar';
import ProfileSidebar from '../components/profile/ProfileSidebar/ProfileSidebar';

const Profile = () => {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="relative flex"> 
                <ProfileSidebar />
                <SidebarInset className="flex-1">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                    </header>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default Profile;