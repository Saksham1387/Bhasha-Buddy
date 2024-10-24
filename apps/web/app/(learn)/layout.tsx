"use client";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import Chat from "../(main)/chatbot";
import { SocketProvider } from "@/context/SocketProvider";
import React, { useState, createContext, useContext } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {}
});

export function useSidebar() {
  return useContext(SidebarContext);
}

const MainLayout = ({
  children,
}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // if(status === "unauthenticated"){
  //   router.push("/")
  //   return
  // }
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      <SocketProvider>
        <MobileHeader />
        <main className={`h-full pt-[500px] lg:pt-0 ${isSidebarOpen ? 'lg:pl-[256px]' : 'pl-20'}`}>
          <Sidebar className="hidden lg:flex" />
          <div className="w-full mx-auto pt-3 h-full">
            {children}
          </div>
        <Chat></Chat>
        </main>
      </SocketProvider>
    </SidebarContext.Provider>
  );
};
 
export default MainLayout;
