import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  progress: number | null;
  category: Category | null;
  chapters: {
    id: string;
  }[];
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({ userId, title, categoryId }: GetCourses) => {
  // }: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const userCourses = await db.userProgress.findMany({
      where: {
        userId,
      },
    });

    const courseIds = userCourses
      .map((userCourse) => userCourse.courseId)
      .filter((id): id is string => id !== null);
    let startedCourses;
    let notStartedCourses;

    console.log("courseIds:::::::::", courseIds);

    startedCourses = await db.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("startedCourses:::::::::", startedCourses);

    notStartedCourses = await db.course.findMany({
      where: {
        id: {
          notIn: courseIds,
        },
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("notStartedCourses:::::::::", notStartedCourses);

    const startedCourseWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        startedCourses.map(async (course) => {
          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    const notStartedCourseWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        notStartedCourses.map(async (course) => {
          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return { startedCourseWithProgress, notStartedCourseWithProgress };
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
