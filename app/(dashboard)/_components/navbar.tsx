import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import { User } from "@/typings";

export interface INavbarProps {
  user: User;
}

export default function Navbar({ user }: INavbarProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-[#0968AC] shadow-sm">
      <MobileSidebar user={user} />
      <NavbarRoutes />
    </div>
  );
}
