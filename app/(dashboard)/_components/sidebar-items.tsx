"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <button
      onClick={() => router.push(href)}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] mx-5 my-1 rounded-md transition-all hover:text-slate-600 hover:bg-violet-300/20",
        isActive ? "text-white bg-violet-800 hover:text-white hover:bg-violet-700" : "text-slate-500"
      )}
    >
      <div className="flex items-center gap-x-2 py-3 px-2">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-slate-50")}
        />
        {label}
      </div>
      {/* <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      /> */}
    </button>
  );
};
