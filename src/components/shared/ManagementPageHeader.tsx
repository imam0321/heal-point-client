"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ManagementPageHeaderProps {
  title: string;
  description: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    type?: "button" | "link";
    onClick?: () => void;
    href?: string;
  };
  children?: React.ReactNode;
}

export default function ManagementPageHeader({
  title,
  description,
  action,
  children,
}: ManagementPageHeaderProps) {
  const Icon = action?.icon || Plus;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="md:text-3xl text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground md:text-base text-sm mt-1">
            {description}
          </p>
        )}
      </div>
      {action && (
        <>
          {action.type === "link" && action.href ? (
            <Link href={action.href}>
              <Button className="bg-linear-to-r from-[#4A90E2] to-[#50E3C2] text-white">
                <Icon className="h-4 w-4" />
                <span className="md:flex hidden ml-1">{action.label}</span>
              </Button>
            </Link>
          ) : (
            <Button
              onClick={action.onClick}
              className="bg-linear-to-r from-[#4A90E2] to-[#50E3C2] text-white"
            >
              <Icon className="h-4 w-4" />
              <span className="md:flex hidden">{action.label}</span>
            </Button>
          )}
        </>
      )}
      {children}
    </div>
  );
}
