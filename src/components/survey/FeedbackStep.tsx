
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
    <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
      <CardContent className="pt-6 p-8">
        <FormField
          control={form.control}
          name="reasonComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold block mb-1">
                Based on your rating of {form.getValues("recommendScore") || "..."}/10, please share why
              </FormLabel>
              <FormDescription className="text-sm mb-4">
                What are the primary reasons behind your score? Your detailed feedback helps us improve.
                You can also select theme tags below to highlight specific areas.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Please share your thoughts here..."
                  className="min-h-[120px] resize-none border-muted bg-background/50 focus:bg-background transition-colors"
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
