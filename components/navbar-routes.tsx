"use client";

import { UserButton } from "@clerk/nextjs";
import { Ghost, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/courses");
  // const isSearchPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
    {isSearchPage && (
      <div className="hidden md:block ml-auto">
        <SearchInput/>
      </div>
    )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost" className="flex gap-x-1 ml-auto">
              <LogOut className="h-4 w-4" /> <span>Exit</span>
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton />
      </div>
    </> 
  );
};
