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

export function NavDocuments({ items }: { items: NavSection[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {items.map((section, index) => (
        <React.Fragment key={index}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>

          <SidebarMenu>
            {section.items.map((item, subIndex) => (
              <SidebarMenuItem key={subIndex}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <span>{item.icon ? <item.icon /> : "•"}</span>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </React.Fragment>
      ))}
    </SidebarGroup>
  );
}
