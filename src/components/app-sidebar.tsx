"use client"

import * as React from "react";
import { NavDocuments } from "@/components/nav-documents"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Link from "next/link";
import Image from "next/image";
import { NavSection } from "@/types/dashboard.types";


export function AppSidebar({
  navbarItems,
  ...props
}: {
  navbarItems: NavSection[];
} & React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/heal-point-icon.svg"
            height={35}
            width={35}
            alt="Logo"
            priority
          />
          <span className="font-bold text-lg text-gray-800 text-nowrap">
            Heal Point
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={navbarItems} />
      </SidebarContent>
      {/* TODO */}
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
