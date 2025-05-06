
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface SatisfactionTrendStepProps {
  form: UseFormReturn<FormValues>;
}

const SatisfactionTrendStep = ({ form }: SatisfactionTrendStepProps) => {
  return (
    <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
      <CardContent className="pt-6 p-8">
        <FormField
          control={form.control}
          name="satisfactionTrend"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold block mb-2">
                My satisfaction with my job at NDX in the last six months is...
              </FormLabel>
              <FormDescription className="text-sm mb-6">
                Please select the option that best reflects your job satisfaction trend
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="increasing" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium cursor-pointer">Increasing</FormLabel>
                      <FormDescription className="text-xs">
                        My job satisfaction has been improving over the last six months
                      </FormDescription>
                    </div>
                  </FormItem>
                  
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="steady" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium cursor-pointer">Steady/about the same</FormLabel>
                      <FormDescription className="text-xs">
                        My job satisfaction has remained about the same over the last six months
                      </FormDescription>
                    </div>
                  </FormItem>
                  
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="declining" />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="font-medium cursor-pointer">Declining</FormLabel>
                      <FormDescription className="text-xs">
                        My job satisfaction has been declining over the last six months
                      </FormDescription>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default SatisfactionTrendStep;
