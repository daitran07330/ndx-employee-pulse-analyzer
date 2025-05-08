
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import ThemeTags from "@/components/survey/ThemeTags";
import AboutENPS from "@/components/survey/AboutENPS";
import { formSchema, positiveThemes, negativeThemes } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface SurveySidebarProps {
  form: UseFormReturn<FormValues>;
}

const SurveySidebar = ({ form }: SurveySidebarProps) => {
  return (
    <aside className="space-y-4">
      <Card className="bg-white border shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Feedback Themes</h2>
        </div>
        <div className="divide-y">
          <div className="p-4">
            <ThemeTags 
              form={form} 
              themes={positiveThemes} 
              type="positive" 
            />
          </div>
          
          <div className="p-4">
            <ThemeTags 
              form={form} 
              themes={negativeThemes} 
              type="negative" 
            />
          </div>
        </div>
      </Card>
      
      {/* About eNPS */}
      <AboutENPS />
    </aside>
  );
};

export default SurveySidebar;
