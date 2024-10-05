import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  progress: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  progress,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={progress} variant={variant} />
      <p
        className={cn(
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {(progress)}% 
      </p>
      Complete
    </div>
  );
};
