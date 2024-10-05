"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  //   {
  //     accessorKey: "price",
  //     header: ({ column }) => {
  //         return (
  //           <Button
  //             variant="ghost"
  //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           >
  //             Price
  //             <ArrowUpDown className="ml-2 h-4 w-4" />
  //           </Button>
  //         )
  //       },
  //   },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") || false;
        
        return (
          <Badge className={cn({ "bg-sky-500": isPublished, "bg-gray-500":!isPublished })} >
            {isPublished? "Published" : "Draft"}
          </Badge>
        );
      },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}  align="end">
            <DropdownMenuItem 
            onClick={() => router.push(
              `/teacher/courses/${course.id}`
            )}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
