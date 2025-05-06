
import { cn } from "@/lib/utils";

interface SurveyStepIndicatorProps {
  currentStep: number;
}

const SurveyStepIndicator = ({ currentStep }: SurveyStepIndicatorProps) => {
  return (
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
  );
};

export default SurveyStepIndicator;
