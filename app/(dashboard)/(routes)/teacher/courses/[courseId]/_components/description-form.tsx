"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";

interface DescriptionFormProps {
  initialData: Course
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description : initialData?.description || ""},
  });

  const [isEditing, setIsEditing] = useState(false);
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("onSubmit", values);
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      setIsEditing((current) => !current)
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing &&(
        <p className={cn("text-sm mt-2",!initialData.description && "text-slate-500 italic")}>{initialData.description || "No Description"}</p>
      )}
      {isEditing && (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4">
          <FormField
          control={form.control}
          name="description" 
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Textarea placeholder="e.g. &apos;This course is about..." disabled={isSubmitting} {...field} /></FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}/>   
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">Save</Button>
          </div>

        </form>
      </Form>)}
    </div>
  );
};
