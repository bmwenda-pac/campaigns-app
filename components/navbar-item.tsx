"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export interface INavbarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  disabled?: boolean;
}

export default function NavbarItem({
  icon: Icon,
  label,
  href,
  disabled,
}: INavbarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}`);

  const onClick = () => router.push(href);

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={cn(
        "flex items-center gap-x-2 mx-1 text-primary-foreground text-sm font-medium px-6 transition-all hover:bg-sky-200/20 rounded-md",
        isActive && "bg-[#0C4671] hover:bg-sky-200/20",
        disabled && "cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-x-2 py-3">
        <Icon size={22} className={cn("text-primary-foreground")} />
        <span className="hidden md:flex">{label}</span>
      </div>
    </button>
  );
}

//
