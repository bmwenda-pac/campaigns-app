"use client";

import { Megaphone, MessageSquare } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { useGetMessages } from "@/actions/features/messages/use-get-messages";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const messages = useGetMessages();

  const data = messages.data ?? [];

  return (
    <ScrollArea className="w-full h-[374px]">
      <div className="flex flex-col w-full p-4 space-y-2">
        {messages?.data?.map(({ messages }, i) => (
          <SidebarItem
            key={messages.id}
            href={"#"}
            icon={Megaphone}
            thumbnail={"M"}
            title={messages.title}
            date={messages.sentAt}
          />
        ))}

        {data.length === 0 && (
          <>
            <SidebarItem.Skeleton />
            <SidebarItem.Skeleton />
          </>
        )}

        {/* <Separator />

        {/* Add new campaign button 
        <Button variant={"ghost"} className="text-muted-foreground">
          <Plus className="mr-2 size-4" />
          Add new campaign
        </Button> */}
      </div>
    </ScrollArea>
  );
}
