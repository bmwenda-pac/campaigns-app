"use client";

import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, Plus } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";
import { createInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@/typings";

export interface ISidebarProps {
  user: User | null;
}

export default function Sidebar({ user }: ISidebarProps) {
  return (
    <div className="h-full bg-[#F1F5F9] border-r flex flex-col overflow-y-auto shadow-sm">
      {/* Nav wrapper w/ Logo and menu */}
      <div className="p-[18px]">
        <Logo />
      </div>
      <Separator />
      <div className="flex flex-col w-full">
        <SidebarRoutes />

        <Separator />

        {/* Add new campaign button  */}
        <Button variant={"ghost"} className="text-muted-foreground">
          <Plus className="mr-2 size-4" />
          Add new campaign
        </Button>
      </div>
      <div className="w-full flex px-4 py-6 bottom-0 absolute border-t">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-start justify-center space-x-3">
            <Avatar className="cursor-pointer">
              <AvatarImage src="/img/png-male.png" />
              <AvatarFallback>
                {createInitials(user?.displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="w-full flex flex-col text-sm">
              <p className="font-medium text-foreground">
                {user?.surname || "User"}
              </p>
              <p className="text-muted-foreground">
                {user?.departmentName || "Department"}
              </p>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <ChevronUp size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>Team</DropdownMenuItem>
                    <DropdownMenuItem disabled>Invite member</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
