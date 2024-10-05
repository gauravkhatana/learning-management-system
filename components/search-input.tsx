"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const debouncedvalue = useDebounce(search);
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedvalue,
          categoryId: currentCategoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedvalue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute left-3 top-3 text-slate-600" />
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search for a course"
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-600"
      />
    </div>
  );
};
