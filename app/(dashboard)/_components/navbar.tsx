import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import SidebarRoutes from "./sidebar-routes";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-[#0968AC] shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
