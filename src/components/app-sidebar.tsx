"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BookOpen,
  BookDown,
  Inbox,
  Layers,
  Newspaper,
  UsersRound,
  Contact,
  FolderOpenDot,
  MessageCircleMore,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const links = [
  {
    title: "Tablau de bord",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Soumissions",
    url: "/admin/submissions",
    icon: BookDown,
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
    icon: FolderOpenDot,
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
    title: "Evénements",
    url: "/admin/events",
    icon: Newspaper,
  },
  {
    title: "Catégories",
    url: "/admin/categories",
    icon: BookOpen,
  },
  {
    title: "Types",
    url: "/admin/types",
    icon: Inbox,
  },
  {
    title: "Auteurs",
    url: "/admin/authors",
    icon: Contact,
  },
  {
    title: "Messages",
    url: "/admin/contact",
    icon: MessageCircleMore,
  },
  {
    title: "Utilisateurs",
    url: "/admin/users",
    icon: UsersRound,
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="group-data-[collapsible=icon]:hidden">
        <div className="relative overflow-hidden px-3 py-2.5 rounded-md bg-gradient-to-br from-blue-600 to-blue-700 flex items-center gap-6 text-xl text-white font-medium shadow-md">
          <div className="absolute -top-6 -right-6 w-20 aspect-square rounded-full bg-blue-500/40" />
          <div className="absolute -bottom-6 -right-6 w-16 aspect-square rounded-full bg-blue-500/50" />
          <div className="bg-blue-800 p-2 rounded-md shadow-inner">
            <Layers size={20} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col">
            <span className="leading-5 text-lg font-semibold">Amazigh</span>
            <span className="text-sm text-white/90 font-normal">
              Bibliotheque
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
          Administration
        </div>
        <NavMain items={links} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator className="my-2" />
        <div className="px-4 py-2 text-sm text-gray-500 group-data-[collapsible=icon]:hidden">
          © {new Date().getFullYear()} Amazigh Bibliotheque
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
