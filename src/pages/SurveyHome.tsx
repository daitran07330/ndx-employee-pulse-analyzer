
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModernHeader from "@/components/layout/ModernHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
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
import { Check, Info, ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommendScore: "",
      reasonComment: "",
      managerScore: "",
      satisfactionTrend: undefined,
    },
    mode: "onChange",
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
  
  // Helper function to determine score category for styling
  const getScoreCategory = (score: number) => {
    if (score >= 9) return "promoter";
    if (score >= 7) return "passive";
    return "detractor";
  };
  
  // Get score label based on category
  const getScoreLabel = (score: number) => {
    const category = getScoreCategory(score);
    if (category === "promoter") return "Excellent";
    if (category === "passive") return "Good";
    return "Needs Improvement";
  };

  // Next step handler
  const handleNextStep = async () => {
    let canContinue = false;
    
    if (currentStep === 1) {
      const recommendScoreValid = await form.trigger("recommendScore");
      canContinue = recommendScoreValid;
    } else if (currentStep === 2) {
      const reasonCommentValid = await form.trigger("reasonComment");
      canContinue = reasonCommentValid;
    } else if (currentStep === 3) {
      const managerScoreValid = await form.trigger("managerScore");
      canContinue = managerScoreValid;
    }
    
    if (canContinue) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  
  // Previous step handler
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <ModernHeader />
      <main className="container py-8 max-w-4xl mx-auto">
        {isSubmitted ? (
          <div className="animate-fade-in">
            <Card className="border-0 shadow-lg overflow-hidden bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6 text-center p-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold mb-4">Thank You!</h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Your feedback has been submitted successfully and will help us improve NDX.
                </p>
                <Button asChild size="lg" className="px-8">
                  <a href="/dashboard">View Results Dashboard</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left column with about eNPS */}
            <div className="md:col-span-2 space-y-6">
              <div className="animate-fade-in">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Pulse Survey</h1>
                <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
                
                <div className="mt-8 mb-8">
                  <div className="relative">
                    <div className="absolute left-0 w-full h-1 bg-muted">
                      <div 
                        className="absolute left-0 h-1 bg-primary transition-all duration-500" 
                        style={{ width: `${(currentStep / 4) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between pt-3">
                      {[1, 2, 3, 4].map(step => (
                        <div key={step} className="relative">
                          <div 
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                              currentStep >= step 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {step}
                          </div>
                          <div 
                            className={cn(
                              "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap",
                              currentStep >= step ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            {step === 1 && "Recommend"}
                            {step === 2 && "Feedback"}
                            {step === 3 && "Manager"}
                            {step === 4 && "Satisfaction"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border border-border/50 bg-white/90 backdrop-blur-sm shadow-sm">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    What is eNPS?
                  </h2>
                  <p className="text-sm mb-4">
                    Employee Net Promoter Score measures loyalty by asking how likely you would recommend 
                    NDX as a workplace. Scores range from -100 to +100.
                  </p>
                  
                  <div className="grid gap-3">
                    <div className="border rounded-md p-3 bg-green-50/50 text-sm">
                      <span className="font-medium text-green-700 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        Promoters (9-10)
                      </span>
                      <span className="text-green-700 text-xs">
                        Enthusiastic employees who promote the company
                      </span>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-yellow-50/50 text-sm">
                      <span className="font-medium text-yellow-700 flex items-center gap-1">
                        <span className="inline-block w-3" />
                        Passives (7-8)
                      </span>
                      <span className="text-yellow-700 text-xs">
                        Satisfied but not committed employees
                      </span>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-red-50/50 text-sm">
                      <span className="font-medium text-red-700 flex items-center gap-1">
                        <ThumbsDown className="h-3 w-3" />
                        Detractors (0-6)
                      </span>
                      <span className="text-red-700 text-xs">
                        Unhappy employees who may speak negatively
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border/50 bg-white/90 backdrop-blur-sm shadow-sm">
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Your Privacy
                  </h2>
                  <p className="text-sm">
                    All responses are anonymous and will be used only in aggregate to help improve the employee experience at NDX.
                    Individual responses cannot be traced back to you.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right column with survey form */}
            <div className="md:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Recommendation Score */}
                  {currentStep === 1 && (
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
                                    // Determine category for styling
                                    const category = getScoreCategory(score);
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
                                        <Button
                                          type="button"
                                          variant={isSelected ? "default" : "outline"}
                                          className={cn(
                                            "w-10 h-10 rounded-full transition-all duration-200 hover:scale-110",
                                            isSelected && category === "promoter" && "bg-green-600 hover:bg-green-600",
                                            isSelected && category === "passive" && "bg-yellow-500 hover:bg-yellow-500",
                                            isSelected && category === "detractor" && "bg-red-600 hover:bg-red-600",
                                            !isSelected && isHovered && category === "promoter" && "border-green-600 text-green-600",
                                            !isSelected && isHovered && category === "passive" && "border-yellow-500 text-yellow-500",
                                            !isSelected && isHovered && category === "detractor" && "border-red-600 text-red-600"
                                          )}
                                          onClick={() => field.onChange(score.toString())}
                                        >
                                          {score}
                                        </Button>
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
                  )}

                  {/* Step 2: Reason Comment */}
                  {currentStep === 2 && (
                    <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
                      <CardContent className="pt-6 p-8">
                        <FormField
                          control={form.control}
                          name="reasonComment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xl font-semibold block mb-1">
                                Based on your rating of {form.getValues("recommendScore")}/10, please share why
                              </FormLabel>
                              <FormDescription className="text-sm mb-4">
                                What are the primary reasons behind your score? Your detailed feedback helps us improve.
                              </FormDescription>
                              <FormControl>
                                <Textarea
                                  placeholder="Please share your thoughts here..."
                                  className="min-h-[200px] resize-none border-muted bg-background/50 focus:bg-background transition-colors"
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
                  )}

                  {/* Step 3: Manager Score */}
                  {currentStep === 3 && (
                    <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
                      <CardContent className="pt-6 p-8">
                        <FormField
                          control={form.control}
                          name="managerScore"
                          render={({ field }) => (
                            <FormItem className="space-y-6">
                              <div>
                                <FormLabel className="text-xl font-semibold block mb-1">
                                  Do you feel valued and heard by your direct manager at NDX?
                                </FormLabel>
                                <FormDescription className="text-sm">
                                  On a scale from 0 to 10, where 0 is not at all valued and 10 is highly valued
                                </FormDescription>
                              </div>
                              
                              <div className="pt-4">
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-11 gap-1"
                                >
                                  {scoreOptions.map((score) => {
                                    // Determine category for styling
                                    const category = getScoreCategory(score);
                                    const isSelected = field.value === score.toString();
                                    const isHovered = hoverScore === score;
                                    
                                    return (
                                      <FormItem 
                                        key={`manager-${score}`} 
                                        className="flex flex-col items-center space-y-2"
                                        onMouseEnter={() => setHoverScore(score)}
                                        onMouseLeave={() => setHoverScore(null)}
                                      >
                                        <FormControl>
                                          <RadioGroupItem value={score.toString()} className="sr-only" />
                                        </FormControl>
                                        <Button
                                          type="button"
                                          variant={isSelected ? "default" : "outline"}
                                          className={cn(
                                            "w-10 h-10 rounded-full transition-all duration-200 hover:scale-110",
                                            isSelected && category === "promoter" && "bg-green-600 hover:bg-green-600",
                                            isSelected && category === "passive" && "bg-yellow-500 hover:bg-yellow-500",
                                            isSelected && category === "detractor" && "bg-red-600 hover:bg-red-600",
                                            !isSelected && isHovered && category === "promoter" && "border-green-600 text-green-600",
                                            !isSelected && isHovered && category === "passive" && "border-yellow-500 text-yellow-500",
                                            !isSelected && isHovered && category === "detractor" && "border-red-600 text-red-600"
                                          )}
                                          onClick={() => field.onChange(score.toString())}
                                        >
                                          {score}
                                        </Button>
                                        {score === 0 && <span className="text-xs text-muted-foreground">Not valued</span>}
                                        {score === 10 && <span className="text-xs text-muted-foreground">Highly valued</span>}
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
                  )}

                  {/* Step 4: Satisfaction Trend */}
                  {currentStep === 4 && (
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
                  )}

                  <div className="flex justify-between">
                    {currentStep > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Previous
                      </Button>
                    )}
                    
                    <div className="ml-auto flex gap-2">
                      {currentStep < 4 ? (
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit">Submit Survey</Button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
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
