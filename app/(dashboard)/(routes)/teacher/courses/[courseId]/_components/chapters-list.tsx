"use Client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) => {
  const [chapters, setChapters] = useState(items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="chapters">
        {(Provided) => (
          <div {...Provided.droppableProps} ref={Provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex  items-center gap-x-2 bg-slate-100 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      // chapter.isPublished &&
                      //   "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        // chapter.isPublished &&
                        //   " border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5 text-slate-500" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          // chapter.isPublished && ""
                        )}
                      >
                        {/* {chapter.isPublished ? "Published" : "Draft"} */}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      ></Pencil>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {Provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
