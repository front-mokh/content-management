"use client";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  
  // Check if a given URL is active (either exact match or starts with for parent items)
  const isActive = (url: string, exact: boolean = false) => {
    if (exact) return pathname === url;
    return pathname === url || pathname.startsWith(url);
  };
  
  // Check if any sub-item is active
  const hasActiveChild = (items?: { url: string }[]) => {
    if (!items) return false;
    return items.some(item => isActive(item.url, true));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Check if the item has subitems
          const hasSubItems = item.items && item.items.length > 0;
          // Check if this item is active
          const itemIsActive = isActive(item.url) || hasActiveChild(item.items);
          
          return hasSubItems ? (
            // Item with subitems - use Collapsible
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={itemIsActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={itemIsActive}
                  >
                    {item.icon && <item.icon className={itemIsActive ? "text-primary" : ""} />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subItemIsActive = isActive(subItem.url, true);
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild
                            isActive={subItemIsActive}
                          >
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            // Item without subitems - use direct link
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                isActive={itemIsActive}
              >
                <a href={item.url}>
                  {item.icon && <item.icon className={itemIsActive ? "text-primary" : ""} />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}