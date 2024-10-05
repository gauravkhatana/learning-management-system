import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { CoursesList } from "@/components/course-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const result = await getCourses({
    userId: userId || "",
    ...searchParams,
  });

  const startedCourses = 'startedCourses' in result ? result.startedCourses : [];
  const notStartedCourses = 'notStartedCourses' in result ? result.notStartedCourses : [];


  return (
    <>
      <div className="p-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4 bg-slate-100">
        <Categories items={categories} />
      
        <CoursesList items={startedCourses} nonItems={notStartedCourses} />
      </div>
    </>
  );
};
export default SearchPage;
