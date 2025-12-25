import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../shadcn/sidebar';
import ProfileSidebar from '../components/profile/ProfileSidebar/ProfileSidebar';

const Profile = () => {
    useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev; 
    };
  }, []);
    return (
        <SidebarProvider defaultOpen={true} className="!flex-[0_0_92dvh] overflow-hidden">
            <div className="relative flex w-full" > 
                <ProfileSidebar />
                <SidebarInset className="flex-1 h-full overflow-y-scroll">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b sm:px-4">
                        <SidebarTrigger />
                    </header>
                    <div className="sm:p-4 h-full">
                        <Outlet />
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default Profile;