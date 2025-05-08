
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import SurveyStepIndicator from "@/components/survey/SurveyStepIndicator";
import RecommendationStep from "@/components/survey/RecommendationStep";
import FeedbackStep from "@/components/survey/FeedbackStep";
import ManagerScoreStep from "@/components/survey/ManagerScoreStep";
import SatisfactionTrendStep from "@/components/survey/SatisfactionTrendStep";
import { z } from "zod";
import { formSchema } from "@/lib/surveySchema";

type FormValues = z.infer<typeof formSchema>;

interface SurveyFormContainerProps {
  form: UseFormReturn<FormValues>;
  onSubmitSuccess: () => void;
}

const SurveyFormContainer = ({ form, onSubmitSuccess }: SurveyFormContainerProps) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  
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
    onSubmitSuccess();
  }
  
  // Calculate progress percentage
  const progressPercentage = (completedSteps.length / 4) * 100;
  const allStepsCompleted = completedSteps.length === 4;
  
  return (
    <div>
      <div className="max-w-3xl mx-auto mb-4">
        <SurveyStepIndicator 
          currentStep={currentStep} 
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        />
      </div>
      
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
    </div>
  );
};

export default SurveyFormContainer;
