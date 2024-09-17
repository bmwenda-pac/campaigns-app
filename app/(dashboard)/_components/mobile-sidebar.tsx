import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { User } from "@/typings";

export interface IMobileSidebarProps {
  user: User;
}

export default function MobileSidebar({ user }: IMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu className="text-primary-foreground" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <Sidebar user={user} />
      </SheetContent>
    </Sheet>
  );
}
