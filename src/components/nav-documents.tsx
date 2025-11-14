"use client"

import React from "react";
import Link from "next/link";
import { NavSection } from "@/types/dashboard.types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getIconComponent } from "@/lib/icon-maper";
import { usePathname } from "next/navigation";

export function NavDocuments({ items }: { items: NavSection[] }) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {items.map((section, index) => (
        <React.Fragment key={index}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item, subIndex) => {
              const Icon = getIconComponent(item.icon);
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={subIndex}>
                  <SidebarMenuButton
                    asChild
                    className={
                      isActive
                        ? "bg-linear-to-r from-[#4A90E2] to-[#50E3C2] text-white hover:text-white"
                        : ""
                    }
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </React.Fragment>
      ))}
    </SidebarGroup>
  );
}
