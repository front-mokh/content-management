"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
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
    url: "resources",
    icon: Bot,
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
    <Sidebar collapsible="icon" {...props} className="bg-white">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={links} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
