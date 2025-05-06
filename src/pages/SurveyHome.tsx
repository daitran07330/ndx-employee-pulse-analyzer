
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModernHeader from "@/components/layout/ModernHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Define form schema with zod
const formSchema = z.object({
  recommendScore: z.string().min(1, "Please select a rating"),
  reasonComment: z.string().min(10, "Please provide at least 10 characters of feedback"),
  managerScore: z.string().min(1, "Please select a rating"),
  satisfactionTrend: z.enum(["increasing", "steady", "declining"], {
    required_error: "Please select a trend",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SurveyHome = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommendScore: "",
      reasonComment: "",
      managerScore: "",
      satisfactionTrend: undefined,
    },
  });

  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    toast.success("Survey submitted successfully!", {
      description: "Thank you for your feedback.",
    });
    setIsSubmitted(true);
  }

  // Generate score options (0-10)
  const scoreOptions = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="container py-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left column with about eNPS */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">Employee Pulse Survey</h1>
              <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-2">What is eNPS?</h2>
                <p className="text-sm mb-4">
                  Employee Net Promoter Score measures loyalty by asking how likely you would recommend 
                  NDX as a workplace. Scores range from -100 to +100.
                </p>
                
                <div className="grid gap-3">
                  <div className="border rounded-lg p-3 bg-green-50 text-sm">
                    <span className="font-medium text-green-700">Promoters (9-10)</span>: 
                    Enthusiastic employees who promote the company
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-yellow-50 text-sm">
                    <span className="font-medium text-yellow-700">Passives (7-8)</span>: 
                    Satisfied but not committed employees
                  </div>
                  
                  <div className="border rounded-lg p-3 bg-red-50 text-sm">
                    <span className="font-medium text-red-700">Detractors (0-6)</span>: 
                    Unhappy employees who may speak negatively
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-2">Your Privacy</h2>
                <p className="text-sm">
                  All responses are anonymous and will be used only in aggregate to help improve the employee experience at NDX.
                  Individual responses cannot be traced back to you.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right column with survey form */}
          <div className="md:col-span-3">
            {isSubmitted ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
                  <p className="mb-6">Your feedback has been submitted successfully.</p>
                  <Button asChild>
                    <a href="/">Take Another Survey</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="recommendScore"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div>
                              <FormLabel className="font-medium">
                                1. How likely are you to recommend NDX as a great place to work?
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Scale: 0 (Not at all likely) to 10 (Extremely likely)
                              </FormDescription>
                            </div>
                            
                            <div className="flex justify-between">
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-11 gap-1"
                              >
                                {scoreOptions.map((score) => (
                                  <FormItem key={score} className="flex flex-col items-center space-y-1">
                                    <FormControl>
                                      <RadioGroupItem value={score.toString()} className="sr-only" />
                                    </FormControl>
                                    <Button
                                      type="button"
                                      variant={field.value === score.toString() ? "default" : "outline"}
                                      className={`w-8 h-8 p-0 ${field.value === score.toString() ? "bg-primary" : ""}`}
                                      onClick={() => field.onChange(score.toString())}
                                    >
                                      {score}
                                    </Button>
                                    {score === 0 && <span className="text-xs">Not likely</span>}
                                    {score === 10 && <span className="text-xs">Very likely</span>}
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="reasonComment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">
                              2. Based on your response to question #1, please share the primary reason(s) for your rating.
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your thoughts here..."
                                className="min-h-[100px] mt-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="managerScore"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <div>
                              <FormLabel className="font-medium">
                                3. Do you feel valued and heard by your direct manager at NDX?
                              </FormLabel>
                              <FormDescription className="text-xs">
                                Scale: 0 (Not at all valued) to 10 (Highly valued)
                              </FormDescription>
                            </div>
                            
                            <div className="flex justify-between">
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-11 gap-1"
                              >
                                {scoreOptions.map((score) => (
                                  <FormItem key={`manager-${score}`} className="flex flex-col items-center space-y-1">
                                    <FormControl>
                                      <RadioGroupItem value={score.toString()} className="sr-only" />
                                    </FormControl>
                                    <Button
                                      type="button"
                                      variant={field.value === score.toString() ? "default" : "outline"}
                                      className={`w-8 h-8 p-0 ${field.value === score.toString() ? "bg-primary" : ""}`}
                                      onClick={() => field.onChange(score.toString())}
                                    >
                                      {score}
                                    </Button>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <FormField
                        control={form.control}
                        name="satisfactionTrend"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">
                              4. My satisfaction with my job at NDX in the last six (6) months is...
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-4 mt-3"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="increasing" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer text-sm">Increasing</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="steady" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer text-sm">Steady</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="declining" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer text-sm">Declining</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button type="submit">Submit Survey</Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      <footer className="py-5 border-t border-border">
        <div className="container text-center text-xs text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer</p>
        </div>
      </footer>
    </div>
  );
};

export default SurveyHome;
