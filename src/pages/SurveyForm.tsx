
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import PageTitle from "@/components/layout/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Link } from "react-router-dom";

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

const SurveyForm = () => {
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
      <Header />
      <main className="container py-8">
        <PageTitle
          title="eNPS Survey Form"
          description="Share your feedback to help improve NDX"
        />

        {isSubmitted ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
              <p className="mb-6">Your feedback has been submitted successfully.</p>
              <Button asChild>
                <Link to="/">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="recommendScore"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div>
                            <FormLabel className="text-lg font-medium">
                              1. How likely are you to recommend NDX as a great place to work to a friend or colleague?
                            </FormLabel>
                            <FormDescription>
                              Scale: 0 (Not at all likely) to 10 (Extremely likely)
                            </FormDescription>
                          </div>
                          
                          <div className="flex flex-col space-y-3">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-11 gap-2"
                            >
                              {scoreOptions.map((score) => (
                                <FormItem key={score} className="flex flex-col items-center space-y-1.5">
                                  <FormControl>
                                    <RadioGroupItem value={score.toString()} className="sr-only" />
                                  </FormControl>
                                  <Button
                                    variant={field.value === score.toString() ? "default" : "outline"}
                                    className={`w-12 h-12 p-0 ${field.value === score.toString() ? "bg-primary" : ""}`}
                                    onClick={() => field.onChange(score.toString())}
                                  >
                                    {score}
                                  </Button>
                                  {score === 0 && <span className="text-xs">Not at all likely</span>}
                                  {score === 10 && <span className="text-xs">Extremely likely</span>}
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reasonComment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium">
                            2. Based on your response to question #1, please share the primary reason(s) for your rating.
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your thoughts here..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="managerScore"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div>
                            <FormLabel className="text-lg font-medium">
                              3. Do you feel valued and heard by your direct manager at NDX?
                            </FormLabel>
                            <FormDescription>
                              Scale: 0 (Not at all valued and heard) to 10 (Highly valued and heard)
                            </FormDescription>
                          </div>
                          
                          <div className="flex flex-col space-y-3">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-11 gap-2"
                            >
                              {scoreOptions.map((score) => (
                                <FormItem key={`manager-${score}`} className="flex flex-col items-center space-y-1.5">
                                  <FormControl>
                                    <RadioGroupItem value={score.toString()} className="sr-only" />
                                  </FormControl>
                                  <Button
                                    variant={field.value === score.toString() ? "default" : "outline"}
                                    className={`w-12 h-12 p-0 ${field.value === score.toString() ? "bg-primary" : ""}`}
                                    onClick={() => field.onChange(score.toString())}
                                  >
                                    {score}
                                  </Button>
                                  {score === 0 && <span className="text-xs">Not at all valued</span>}
                                  {score === 10 && <span className="text-xs">Highly valued</span>}
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="satisfactionTrend"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-lg font-medium">
                            4. My satisfaction with my job at NDX in the last six (6) months is...
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col md:flex-row gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="increasing" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Increasing</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="steady" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Steady/about the same</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="declining" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Declining</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit">Submit Survey</Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Your privacy is important to us</h3>
                  <p className="text-sm text-muted-foreground">
                    All responses are anonymous and will be used only in aggregate to help improve the employee experience at NDX.
                    Individual responses cannot be traced back to you.
                  </p>
                </CardContent>
              </Card>
            </form>
          </Form>
        )}
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer</p>
        </div>
      </footer>
    </div>
  );
};

export default SurveyForm;
