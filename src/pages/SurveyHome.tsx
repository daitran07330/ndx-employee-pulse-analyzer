
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModernHeader from "@/components/layout/ModernHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import SurveyStepIndicator from "@/components/survey/SurveyStepIndicator";
import AboutENPS from "@/components/survey/AboutENPS";
import RecommendationStep from "@/components/survey/RecommendationStep";
import FeedbackStep from "@/components/survey/FeedbackStep";
import ManagerScoreStep from "@/components/survey/ManagerScoreStep";
import SatisfactionTrendStep from "@/components/survey/SatisfactionTrendStep";
import ThankYouCard from "@/components/survey/ThankYouCard";
import ThemeTags from "@/components/survey/ThemeTags";
import { formSchema, positiveThemes, negativeThemes } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

const SurveyHome = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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
      positiveTags: [],
      negativeTags: [],
    },
    mode: "onChange",
  });

  // Track form field changes to update progress
  useEffect(() => {
    const subscription = form.watch((value) => {
      const newCompletedSteps = [];
      
      if (value.recommendScore) {
        newCompletedSteps.push(1);
      }
      
      if (value.reasonComment && value.reasonComment.length >= 10) {
        newCompletedSteps.push(2);
      }
      
      if (value.managerScore) {
        newCompletedSteps.push(3);
      }
      
      if (value.satisfactionTrend) {
        newCompletedSteps.push(4);
      }
      
      setCompletedSteps(newCompletedSteps.sort((a, b) => a - b));
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Click on progress indicator to focus on a section
  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    
    // Scroll to the section
    const sectionId = `survey-section-${step}`;
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    toast.success("Survey submitted successfully!", {
      description: "Thank you for your feedback.",
    });
    setIsSubmitted(true);
  }
  
  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / 4) * 100;
  const allStepsCompleted = completedSteps.length === 4;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <ModernHeader />
      
      <main className="container py-6 max-w-7xl mx-auto">
        {isSubmitted ? (
          <ThankYouCard />
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Pulse Survey</h1>
              <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-4">
              <SurveyStepIndicator 
                currentStep={currentStep} 
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main content area (moved to the left) */}
              <div className="md:col-span-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* All survey sections are always visible */}
                    <section id="survey-section-1" className="scroll-mt-28">
                      <h2 className="text-xl font-semibold mb-4">1. Recommendation Score</h2>
                      <RecommendationStep 
                        form={form}
                        hoverScore={hoverScore}
                        setHoverScore={setHoverScore}
                      />
                    </section>
                    
                    <section id="survey-section-2" className="scroll-mt-28">
                      <h2 className="text-xl font-semibold mb-4">2. Feedback</h2>
                      <FeedbackStep form={form} />
                    </section>
                    
                    <section id="survey-section-3" className="scroll-mt-28">
                      <h2 className="text-xl font-semibold mb-4">3. Manager Feedback</h2>
                      <ManagerScoreStep 
                        form={form}
                        hoverScore={hoverScore}
                        setHoverScore={setHoverScore}
                      />
                    </section>
                    
                    <section id="survey-section-4" className="scroll-mt-28">
                      <h2 className="text-xl font-semibold mb-4">4. Satisfaction Trend</h2>
                      <SatisfactionTrendStep form={form} />
                    </section>
                    
                    {/* Sticky submit section */}
                    <div className="sticky bottom-6 pt-4">
                      <Card className="bg-white/95 backdrop-blur shadow-lg border p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Survey Completion</span>
                              <span className="text-muted-foreground">{completedSteps.length}/4 questions</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                          </div>
                          
                          <Button 
                            type="submit" 
                            disabled={!allStepsCompleted}
                            className="w-full md:w-auto"
                          >
                            {allStepsCompleted ? (
                              <span className="flex items-center gap-2">
                                <Check className="h-4 w-4" />
                                Submit Survey
                              </span>
                            ) : (
                              "Please Complete All Questions"
                            )}
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </form>
                </Form>
              </div>
              
              {/* Right sidebar with theme tags and information (moved from left to right) */}
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
                
                {/* About eNPS moved under the hashtags */}
                <AboutENPS />
              </aside>
            </div>
          </div>
        )}
      </main>
      
      <footer className="py-4 border-t border-border mt-8">
        <div className="container text-center text-xs text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer</p>
        </div>
      </footer>
    </div>
  );
};

export default SurveyHome;
