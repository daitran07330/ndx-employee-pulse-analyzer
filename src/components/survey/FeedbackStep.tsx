
import { useState, useRef } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const tagId = e.dataTransfer.getData("tagId");
    const tagText = e.dataTransfer.getData("tagText");
    
    if (tagText) {
      // Get current text and cursor position
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const currentValue = form.getValues("reasonComment") || "";
      const cursorPosition = textarea.selectionStart;
      
      // Insert hashtag at cursor position
      const tagWithHash = ` #${tagText} `;
      const newValue = 
        currentValue.substring(0, cursorPosition) + 
        tagWithHash + 
        currentValue.substring(cursorPosition);
      
      // Update the form value
      form.setValue("reasonComment", newValue, { shouldValidate: true });
      
      // Set cursor position after the inserted tag
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(
            cursorPosition + tagWithHash.length,
            cursorPosition + tagWithHash.length
          );
        }
      }, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

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
                  placeholder="Your feedback helps us improve... (Drag hashtags here to include them)"
                  className="min-h-[150px] resize-none border-muted bg-background/50 focus:bg-background"
                  ref={textareaRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
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
