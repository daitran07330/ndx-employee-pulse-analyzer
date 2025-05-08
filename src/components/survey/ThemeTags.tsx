
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface ThemeTagsProps {
  form: UseFormReturn<FormValues>;
  themes: Array<{ id: string; text: string; count: number }>;
  type: "positive" | "negative";
}

const ThemeTags = ({ form, themes, type }: ThemeTagsProps) => {
  const fieldName = type === "positive" ? "positiveTags" : "negativeTags";
  const selectedTags = form.watch(fieldName) || [];
  
  const handleTagToggle = (tagId: string) => {
    const currentTags = form.getValues(fieldName) || [];
    
    if (currentTags.includes(tagId)) {
      const updatedTags = currentTags.filter((id) => id !== tagId);
      form.setValue(fieldName, updatedTags);
    } else {
      form.setValue(fieldName, [...currentTags, tagId]);
    }
  };

  const onDragStart = (e: React.DragEvent, tagId: string) => {
    e.dataTransfer.setData("tagId", tagId);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const tagId = e.dataTransfer.getData("tagId");
    handleTagToggle(tagId);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="mb-2">
        <h3 className="font-medium text-sm">
          {type === "positive" ? "Positive Themes" : "Negative Themes"}
        </h3>
        <p className="text-xs text-muted-foreground">
          Select themes that resonate with your experience
        </p>
      </div>
      
      <div className="mt-2 space-y-4">
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Badge
              key={theme.id}
              variant={selectedTags.includes(theme.id) ? "default" : "outline"}
              className={`cursor-grab flex items-center gap-1 py-1.5 px-3 text-sm ${
                selectedTags.includes(theme.id) 
                  ? type === "positive" ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                     : "bg-red-100 text-red-800 hover:bg-red-200"
                  : "bg-background hover:bg-muted"
              }`}
              onClick={() => handleTagToggle(theme.id)}
              draggable
              onDragStart={(e) => onDragStart(e, theme.id)}
            >
              <span className="text-muted-foreground mr-1 opacity-70">#</span>
              {theme.text}
              <span className="ml-1 text-xs opacity-70">({theme.count}+)</span>
            </Badge>
          ))}
        </div>
        
        <div 
          className={`mt-4 p-4 border-2 border-dashed rounded-md min-h-[80px] flex flex-wrap gap-2 ${
            type === "positive" ? "border-green-300" : "border-red-300"
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {selectedTags.length === 0 ? (
            <div className="w-full text-center text-muted-foreground p-2">
              Drag tags here or click to select
            </div>
          ) : (
            selectedTags.map((tagId) => {
              const theme = themes.find((t) => t.id === tagId);
              return (
                <Badge
                  key={tagId}
                  className={`cursor-pointer flex items-center gap-1 py-1.5 px-3 text-sm ${
                    type === "positive" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
                  onClick={() => handleTagToggle(tagId)}
                >
                  <span className="text-muted-foreground mr-1 opacity-70">#</span>
                  {theme?.text}
                  <span className="ml-1 text-xs opacity-70">({theme?.count}+)</span>
                </Badge>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeTags;
