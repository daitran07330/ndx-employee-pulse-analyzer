
import { useState } from "react";
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
import { formSchema } from "@/lib/surveySchema";

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
          <ThankYouCard />
        ) : (
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left column with about eNPS */}
            <div className="md:col-span-2 space-y-6">
              <div className="animate-fade-in">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Pulse Survey</h1>
                <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
                
                <div className="mt-8 mb-8">
                  <SurveyStepIndicator currentStep={currentStep} />
                </div>
              </div>
              
              <AboutENPS />
              <PrivacyInfo />
            </div>

            {/* Right column with survey form */}
            <div className="md:col-span-3">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Recommendation Score */}
                  {currentStep === 1 && (
                    <RecommendationStep 
                      form={form}
                      hoverScore={hoverScore}
                      setHoverScore={setHoverScore}
                    />
                  )}

                  {/* Step 2: Reason Comment */}
                  {currentStep === 2 && (
                    <FeedbackStep form={form} />
                  )}

                  {/* Step 3: Manager Score */}
                  {currentStep === 3 && (
                    <ManagerScoreStep 
                      form={form}
                      hoverScore={hoverScore}
                      setHoverScore={setHoverScore}
                    />
                  )}

                  {/* Step 4: Satisfaction Trend */}
                  {currentStep === 4 && (
                    <SatisfactionTrendStep form={form} />
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
