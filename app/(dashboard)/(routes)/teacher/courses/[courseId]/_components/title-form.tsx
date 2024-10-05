"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
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
        Course title
        <Button
          variant="ghost"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing &&(
        <p className="text-sm mt-2">{initialData.title}</p>
      )}
      {isEditing && (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4">
          <FormField
          control={form.control}
          name="title" 
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Input placeholder="e.g. Adavance Web Development" disabled={isSubmitting} {...field} /></FormControl>
              <FormMessage>
                {form.formState.errors.title?.message}
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
