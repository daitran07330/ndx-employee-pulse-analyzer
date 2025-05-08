
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface FeedbackStepProps {
  form: UseFormReturn<FormValues>;
}

const FeedbackStep = ({ form }: FeedbackStepProps) => {
  return (
    <Card className="border shadow-sm rounded-lg bg-white">
      <CardContent className="p-6">
        <FormField
          control={form.control}
          name="reasonComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium mb-1">
                Why did you rate us {form.getValues("recommendScore") || "..."}/10?
              </FormLabel>
              <FormDescription className="text-sm mb-4">
                Please share your thoughts and select relevant themes from the right panel
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Your feedback helps us improve..."
                  className="min-h-[150px] resize-none border-muted bg-background/50 focus:bg-background"
                  {...field}
                />
              </FormControl>
              <div className="mt-2 text-xs text-right text-muted-foreground">
                {field.value?.length || 0} characters 
                (minimum 10 required)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default FeedbackStep;
