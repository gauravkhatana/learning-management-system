// CourseCard.tsx (Server Component)
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/icon-badge";
import { BookOpen } from "lucide-react";
import { CourseProgress } from "./course-progress";
import { Button } from "./ui/button";
import { db } from "@/lib/db";
import { CourseCardClient } from "./ui/course-card-client";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  progress: number | null;
  category: string | null;
  userId: string;
}

export const CourseCard = async ({
  id,
  title,
  imageUrl,
  chapterLength,
  progress,
  category,
  userId
}: CourseCardProps) => {

  const userProgress = await db.userProgress.findMany({
    where: {
      userId,
      courseId: id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take : 1,

  });

  return (
    <CourseCardClient 
      id={id}
      title={title}
      imageUrl={imageUrl}
      chapterLength={chapterLength}
      progress={progress}
      category={category}
      userProgress={userProgress[0]}
    />
  );
};



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { IconBadge } from "@/components/icon-badge";
// import { BookOpen } from "lucide-react";
// import { CourseProgress } from "./course-progress";
// import { Button } from "./ui/button";
// import { redirect, useRouter } from "next/navigation";
// import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";

// interface CourseCardProps {
//   id: string;
//   title: string;
//   imageUrl: string;
//   chapterLength: number;
//   progress: number | null;
//   category: string | null;
//   userId: string;
// }

// export const CourseCard = async ({
//   id,
//   title,
//   imageUrl,
//   chapterLength,
//   progress,
//   category,
//   userId
// }: CourseCardProps) => {

//   const userProgress = await db.userProgress.findUnique({
//     where: {
//       userId_activityId: {
//         courseId: id,
//         userId : userId!,
//       },
//     },
//   });

//   const router = useRouter();

//   const courseProgress = () => {
//    router.push(
//       `/search/${userProgress?.courseId}/chapters/${userProgress?.chapterId}/activities/${userProgress?.activityId}`
//     );
//   };

//   return (
//     <Link href={`/search/${id}`}>
//       <div className="group transition border rounded-lg p-3 h-full hover:shadow-lm overflow-hidden">
//         <div className="relative w-full aspect-video rounded-md overflow-hidden">
//           <Image fill className="object-cover" src={imageUrl} alt={title} />
//         </div>
//         <div className="flex flex-col pt-2">
//           <div className="text-md md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
//             {title}
//           </div>
//           <p className="text-xs text-muted-foreground">{category}</p>
//           <div className="my-3 flex item-center gap-x-2 test-sm md:text-xs">
//             <div className="flex items-center gap-x-1 text-slate-500">
//               <IconBadge size="sm" icon={BookOpen} />
//               <span>
//                 {chapterLength} {chapterLength == 1 ? "chapter" : "chapters"}
//               </span>
//             </div>
//           </div>
//           {progress !== null && (
//             <div className="progress flex align--itemss-center justify-between gap-x-2 text-sm md:text-xs">
//               <CourseProgress
//                 size="sm"
//                 progress={progress}
//                 variant={progress === 100 ? "success" : "default"}
//               />
//               <Button
//                 onClick={courseProgress}
//                 className="resume  "
//                 variant="ghost"
//               >
//                 Resume
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };
