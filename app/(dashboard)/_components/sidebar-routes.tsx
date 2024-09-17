"use client";

import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarItem from "./sidebar-item";
import { Separator } from "@/components/ui/separator";

export interface ISidebarRoutesProps {}

const routes = [
  {
    href: "/dashboard",
    label: "Now",
    icon: MessageSquare,
  },
];

export default function SidebarRoutes(props: ISidebarRoutesProps) {
  // TODO: Api call to fetch past messages
  return (
    <div className="flex flex-col w-full p-4 space-y-2">
      {/* <SidebarItem
        href={"#"}
        icon={Megaphone}
        thumbnail={"M"}
        title={"New policy"}
      /> */}

      <SidebarItem.Skeleton />
      <SidebarItem.Skeleton />

      <Separator />

      {/* Add new campaign button */}
      <Button variant={"ghost"} className="text-muted-foreground">
        <Plus className="mr-2 size-4" />
        Add new campaign
      </Button>
    </div>
  );
}
