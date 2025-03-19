"use client";

import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const links = [
  {
    title: "Soumissions",
    url: "submissions",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "En Attente",
        url: "submissions/pending",
      },
      {
        title: "Approuvées",
        url: "submissions/approved",
      },
      {
        title: "Rejetées",
        url: "submissions/rejected",
      },
    ],
  },
  {
    title: "Resources",
    url: "/admin/resources/unpublished",
    icon: Bot,
    items: [
      {
        title: "Non Publiées",
        url: "/admin/resources/unpublished",
      },
      {
        title: "Publiées",
        url: "/admin/resources/published",
      },
    ],
  },
  {
    title: "Catégories",
    url: "categories",
    icon: BookOpen,
  },
  {
    title: "Types",
    url: "types",
    icon: Settings2,
  },
  {
    title: "Authors",
    url: "authors",
    icon: Settings2,
  },
  {
    title: "Utilisateurs",
    url: "users",
    icon: Settings2,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={links} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
