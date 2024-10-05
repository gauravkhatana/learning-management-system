"use client";

import { BarChart, Book, Compass, FileCode, Layout, List, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-items";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/search",
  },
  {
    icon: Users,
    label: "My Team Learning",
    href: "/team",
  },
  {
    icon: Compass,
    label: "Forum",
    href: "/forum",
  },
  {
    icon: FileCode,
    label: "Resourses",
    href: "/resource",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacher = pathname?.includes("/teacher");
  const routes = isTeacher ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
