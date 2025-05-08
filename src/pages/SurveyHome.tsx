
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "@/lib/surveySchema";
import SurveyLayout from "@/components/survey/SurveyLayout";
import SurveyFormContainer from "@/components/survey/SurveyFormContainer";
import SurveySidebar from "@/components/survey/SurveySidebar";
import ThankYouCard from "@/components/survey/ThankYouCard";
import { Form } from "@/components/ui/form";

const SurveyHome = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize form with proper types
  const form = useForm<z.infer<typeof formSchema>>({
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
  
  return (
    <SurveyLayout>
      {isSubmitted ? (
        <ThankYouCard />
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Pulse Survey</h1>
            <p className="text-muted-foreground">Your feedback helps us improve NDX</p>
          </div>
          
          <Form {...form}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main content area (moved to the left) */}
              <div className="md:col-span-2">
                <SurveyFormContainer 
                  form={form} 
                  onSubmitSuccess={() => setIsSubmitted(true)} 
                />
              </div>
              
              {/* Right sidebar with theme tags and information */}
              <div className="md:col-span-1">
                <SurveySidebar form={form} />
              </div>
            </div>
          </Form>
        </div>
      )}
    </SurveyLayout>
  );
};

export default SurveyHome;
