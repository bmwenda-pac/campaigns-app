"use client";

import Logo from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { ArchiveIcon, Pencil2Icon, TimerIcon } from "@radix-ui/react-icons";
import { MessageSquare, Timer } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMedia } from "react-use";
import SidebarRoutes from "./sidebar-routes";

const routes = [
  {
    href: "/dashboard",
    label: "Now",
    icon: <MessageSquare className="size-6 mr-2" />,
  },
  { href: "#", label: "Schedule", icon: <Timer className="size-6" /> },
  { href: "#", label: "Recurring", icon: <TimerIcon className="size-6" /> },
  { href: "#", label: "Draft", icon: <Pencil2Icon className="size-6" /> },
  { href: "#", label: "Archived", icon: <ArchiveIcon className="size-6" /> },
];

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  const isMobile = useMedia("(max-width: 760px)", false);
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="h-full bg-[#F1F5F9] border-r flex flex-col overflow-y-auto shadow-sm">
      {/* Nav wrapper w/ Logo and menu */}
      <div className="p-[18px]">
        <Logo />
      </div>
      <Separator />
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      {/* <div className="">
        <div className="w-full h-[60px] flex items-center justify-between px-6">
          <div className="flex">
            <Mails className="size-6 mr-2" />
            <span>Pacis Kenya</span>
          </div>
          <Button
            size={"icon"}
            className="bg-background border shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Contact className="size-6 text-foreground" />
          </Button>
        </div>
      </div> */}
      {/* <Separator className="bg-slate-400" /> */}
      {/* Nav card */}
      {/* <nav className="w-full flex flex-col px-4 pt-4 gap-5">
        {routes.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={`${href}`}
            className={cn(
              "w-full h-12 flex items-center px-3 py-2 gap-3 rounded-lg hover:bg-primary/90",
              pathname === href && "bg-muted text-primary"
            )}
          >
            {icon}
            {label}
          </Link>
        ))}
        {/* <Link
          href="#"
          className="w-full h-12 bg-muted flex items-center px-3 py-2 gap-3 rounded-lg text-primary"
        >
          <MessageSquare className="size-6" /> Now
        </Link>
        <Link
          href="#"
          className="w-full h-12 flex items-center px-3 py-2 gap-3 rounded-lg hover:bg-primary/90"
        >
          <Timer className="size-6" /> Schedule
        </Link>
        <Link
          href="#"
          className="w-full h-12 flex items-center px-3 py-2 gap-3 rounded-lg hover:bg-primary/90"
        >
          <TimerIcon className="size-6" /> Recurring
        </Link>
        <Link
          href="#"
          className="w-full h-12 flex items-center px-3 py-2 gap-3 rounded-lg hover:bg-primary/90"
        >
          <Pencil2Icon className="size-6" /> Draft
        </Link>
        <Link
          href="#"
          className="w-full h-12 flex items-center px-3 py-2 gap-3 rounded-lg hover:bg-primary/90"
        >
          <ArchiveIcon className="size-6" /> Archived
        </Link>
      </nav> */}
    </div>
  );
}
