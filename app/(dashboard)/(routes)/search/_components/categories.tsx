"use client";

import { Category } from "@prisma/client";
import {
  FcFilmReel,
  FcEngineering,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoryProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
  "Fitness": FcSportsMode,
};

export const Categories = ({ items }: CategoryProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((category) => (
        <CategoryItem
          value={category.id}
          key={category.id}
          icon={iconMap[category.name]}
          label={category.name}
        />
      ))}
    </div>
  );
};
