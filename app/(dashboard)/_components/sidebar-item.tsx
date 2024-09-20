"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon, Megaphone } from "lucide-react";
import Link from "next/link";

export interface ISidebarItemProps {
  href: string;
  icon: LucideIcon;
  thumbnail: string;
  title: string;
}

export default function SidebarItem({
  href,
  icon,
  thumbnail,
  title,
}: ISidebarItemProps) {
  return (
    <Link
      href={"#"}
      className="w-full h-full bg-card flex items-center justify-start gap-3 px-3 py-2 rounded-lg"
    >
      <div className="relative w-9 bg-[#0F172A] flex flex-col items-center justify-center p-[6px] rounded-md text-white">
        {title.charAt(0)}
        <div className="absolute bg-white -top-2 -right-2 p-[2px] rounded-full">
          <Megaphone size={15} color="#000" />
        </div>
      </div>
      <p className="text-sm line-clamp-1">{title}</p>
    </Link>
  );
}

SidebarItem.Skeleton = function SidebarItemSkeleton() {
  return (
    <div className="w-full h-full flex items-center space-x-3 px-3 py-2 rounded-lg border shadow-sm">
      <Skeleton className="size-9 rounded-md" />
      <div>
        <Skeleton className="h-4 w-[90px]" />
      </div>
    </div>
  );
};

// import { cn } from "@/lib/utils";
// import { LucideIcon } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";

// export interface ISidebarItemProps {
//   icon: LucideIcon;
//   label: string;
//   href: string;
// }

// export default function SidebarItem({
//   icon: Icon,
//   label,
//   href,
// }: ISidebarItemProps) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const isActive =
//     (pathname === "/" && href === "/") ||
//     pathname === href ||
//     pathname?.startsWith(`${href}/`);

//   const onClick = () => {};

//   return (
//     <button
//       onClick={onClick}
//       type="button"
//       className={cn(
//         "flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
//         isActive &&
//           "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
//       )}
//     >
//       <div className="flex items-center gap-x-2 py-4">
//         <Icon
//           size={22}
//           className={cn("text-slate-500", isActive && "text-sky-700")}
//         />
//         {label}
//       </div>
//       <div
//         className={cn(
//           "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
//           isActive && "opacity-100"
//         )}
//       />
//     </button>
//   );
// }
