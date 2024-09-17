"use client";

import {
  MessageSquare,
  Users,
  ChartPie,
  BrainCircuit,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NavbarItem from "./navbar-item";
import { Separator } from "./ui/separator";

export interface INavbarRoutesProps {}

const routes = [
  { href: "/analytics", label: "Analytics", icon: ChartPie, disabled: true },
  { href: "/userbase", label: "Userbase", icon: Users, disabled: true },
  {
    href: "/",
    label: "Campaigns",
    icon: MessageSquare,
    disabled: false,
  },
  {
    href: "/automations",
    label: "Automations",
    icon: BrainCircuit,
    disabled: true,
  },
];

const settings = {
  href: "/settings",
  label: "Settings",
  icon: Settings,
  disabled: true,
};

export default function NavbarRoutes(props: INavbarRoutesProps) {
  // Fetch authenticated user
  const pathname = usePathname();

  return (
    <div className="flex w-full">
      {routes.map((route) => (
        <NavbarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
          disabled={route.disabled}
        />
      ))}

      <div className="flex ml-auto">
        <Separator orientation={"vertical"} />
        <NavbarItem
          key={settings.href}
          icon={settings.icon}
          label={settings.label}
          href={settings.href}
          disabled={settings.disabled}
        />
      </div>
    </div>
  );
}
