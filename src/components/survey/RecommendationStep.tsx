
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import ScoreButton from "./ScoreButton";
import { getScoreCategory, getScoreLabel, scoreOptions } from "@/lib/surveySchema";
import { z } from "zod";
import { formSchema } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface RecommendationStepProps {
  form: UseFormReturn<FormValues>;
  hoverScore: number | null;
  setHoverScore: (score: number | null) => void;
}

const RecommendationStep = ({ form, hoverScore, setHoverScore }: RecommendationStepProps) => {
  return (
    <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
      <CardContent className="pt-6 p-8">
        <FormField
          control={form.control}
          name="recommendScore"
          render={({ field }) => (
            <FormItem className="space-y-6">
              <div>
                <FormLabel className="text-xl font-semibold block mb-1">
                  How likely are you to recommend NDX as a great place to work?
                </FormLabel>
                <FormDescription className="text-sm">
                  On a scale from 0 to 10, where 0 is not at all likely and 10 is extremely likely
                </FormDescription>
              </div>
              
              <div className="pt-4">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-11 gap-1"
                >
                  {scoreOptions.map((score) => {
                    const isSelected = field.value === score.toString();
                    const isHovered = hoverScore === score;
                    
                    return (
                      <FormItem 
                        key={score} 
                        className="flex flex-col items-center space-y-2"
                        onMouseEnter={() => setHoverScore(score)}
                        onMouseLeave={() => setHoverScore(null)}
                      >
                        <FormControl>
                          <RadioGroupItem value={score.toString()} className="sr-only" />
                        </FormControl>
                        <ScoreButton
                          score={score}
                          isSelected={isSelected}
                          isHovered={isHovered}
                          onClick={() => field.onChange(score.toString())}
                        />
                        {score === 0 && <span className="text-xs text-muted-foreground">Not likely</span>}
                        {score === 10 && <span className="text-xs text-muted-foreground">Very likely</span>}
                      </FormItem>
                    );
                  })}
                </RadioGroup>
                
                {field.value && (
                  <div className="mt-6 text-center animate-fade-in">
                    <div className={cn(
                      "inline-block px-4 py-2 rounded-full text-sm font-medium",
                      getScoreCategory(parseInt(field.value)) === "promoter" && "bg-green-100 text-green-800",
                      getScoreCategory(parseInt(field.value)) === "passive" && "bg-yellow-100 text-yellow-800",
                      getScoreCategory(parseInt(field.value)) === "detractor" && "bg-red-100 text-red-800"
                    )}>
                      {getScoreLabel(parseInt(field.value))}: {field.value}/10
                    </div>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default RecommendationStep;
