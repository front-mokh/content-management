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
    url: "/admin/submissions/pending",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "En Attente",
        url: "/admin/submissions/pending",
      },    
      {
        title: "Rejetées",
        url: "/admin/submissions/rejected",
      },
      {
        title: "Approuvées",
        url: "/admin/submissions/accepted",
      },
      {
        title: "Convertis",
        url: "/admin/submissions/converted",
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
    url: "/admin/types",
    icon: Settings2,
  },
  {
    title: "Authors",
    url: "/admin/authors",
    icon: Settings2,
  },
  {
    title: "Utilisateurs",
    url: "/admin/users",
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
