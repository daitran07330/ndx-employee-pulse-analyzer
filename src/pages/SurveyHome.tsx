
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModernHeader from "@/components/layout/ModernHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Check } from "lucide-react";
import SurveyStepIndicator from "@/components/survey/SurveyStepIndicator";
import AboutENPS from "@/components/survey/AboutENPS";
import PrivacyInfo from "@/components/survey/PrivacyInfo";
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
    const subscription = form.watch((value, { name, type }) => {
      if (!name || !type) return;
      
      if (name === "recommendScore" && value.recommendScore) {
        updateCompletedSteps(1);
      }
      
      if (name === "reasonComment" && value.reasonComment && value.reasonComment.length >= 10) {
        updateCompletedSteps(2);
      } else if (name === "reasonComment" && (!value.reasonComment || value.reasonComment.length < 10)) {
        removeFromCompletedSteps(2);
      }
      
      if (name === "managerScore" && value.managerScore) {
        updateCompletedSteps(3);
      }
      
      if (name === "satisfactionTrend" && value.satisfactionTrend) {
        updateCompletedSteps(4);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Helper functions for tracking completed steps
  const updateCompletedSteps = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step].sort((a, b) => a - b));
    }
    
    if (currentStep === step) {
      setCurrentStep(step < 4 ? step + 1 : step);
    }
  };
  
  const removeFromCompletedSteps = (step: number) => {
    setCompletedSteps(prev => prev.filter(s => s !== step));
  };
  
  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    toast.success("Survey submitted successfully!", {
      description: "Thank you for your feedback.",
    });
    setIsSubmitted(true);
  }
  
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
  
  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / 4) * 100;
  const allStepsCompleted = completedSteps.length === 4;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <ModernHeader />
      <main className="container py-8 max-w-5xl mx-auto">
        {isSubmitted ? (
          <ThankYouCard />
        ) : (
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left column with about eNPS */}
            <div className="md:col-span-2 space-y-6">
              <div className="animate-fade-in sticky top-24">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Pulse Survey</h1>
                <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
                
                <div className="mt-8 mb-8">
                  <SurveyStepIndicator 
                    currentStep={currentStep} 
                    completedSteps={completedSteps}
                    onStepClick={handleStepClick}
                  />
                </div>
                
                <AboutENPS />
                <PrivacyInfo />
              </div>
            </div>

            {/* Right column with survey form */}
            <div className="md:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  {/* Step 1: Recommendation Score */}
                  <div id="survey-section-1" className="scroll-mt-28">
                    <RecommendationStep 
                      form={form}
                      hoverScore={hoverScore}
                      setHoverScore={setHoverScore}
                    />
                  </div>

                  {/* Step 2: Reason Comment and Theme Tags */}
                  <div id="survey-section-2" className="scroll-mt-28 space-y-6">
                    <FeedbackStep form={form} />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
                        <ThemeTags 
                          form={form} 
                          themes={positiveThemes} 
                          type="positive" 
                        />
                      </Card>
                      
                      <Card className="border-0 shadow-lg overflow-hidden animate-fade-in bg-white/90 backdrop-blur-sm">
                        <ThemeTags 
                          form={form} 
                          themes={negativeThemes} 
                          type="negative" 
                        />
                      </Card>
                    </div>
                  </div>

                  {/* Step 3: Manager Score */}
                  <div id="survey-section-3" className="scroll-mt-28">
                    <ManagerScoreStep 
                      form={form}
                      hoverScore={hoverScore}
                      setHoverScore={setHoverScore}
                    />
                  </div>

                  {/* Step 4: Satisfaction Trend */}
                  <div id="survey-section-4" className="scroll-mt-28">
                    <SatisfactionTrendStep form={form} />
                  </div>

                  <div className="sticky bottom-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">
                        Survey Completion: {Math.round(progressPercentage)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {completedSteps.length}/4 questions answered
                      </div>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-4">
                      <div 
                        className="bg-primary h-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        disabled={!allStepsCompleted}
                        className="px-8"
                      >
                        {allStepsCompleted ? "Submit Survey" : "Please Complete All Questions"}
                      </Button>
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
