// "use Client";
import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card";
import { auth } from "@clerk/nextjs/server";

type CourseWithProgressWithCategory = Course & {
  progress: number | null;
  category: Category | null;
  chapters: {
    id: string;
  }[];
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  nonItems: CourseWithProgressWithCategory[];
}
export const CoursesList = ({ items, nonItems }: CoursesListProps) => {

 const { userId } = auth();

 

  return (
    <div>
      <div className="grid dm grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
          id={item.id}
          key={item.id}
          title={item.title}
          imageUrl={item.imageUrl!}
          chapterLength={item.chapters.length}
          progress={item.progress}
          category={item?.category?.name!}
          userId={userId!}
          
          />
        ))}
        {nonItems.map((item) => (
          <CourseCard
          id={item.id}
          key={item.id}
          title={item.title}
          imageUrl={item.imageUrl!}
          chapterLength={item.chapters.length}
          progress={item.progress}
          category={item?.category?.name!}
          userId={userId!}
          
          />
        ))}
      </div>
      {items.length === 0 && nonItems.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
