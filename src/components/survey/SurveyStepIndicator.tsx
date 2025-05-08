
import { cn } from "@/lib/utils";

interface SurveyStepIndicatorProps {
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (step: number) => void;
}

const SurveyStepIndicator = ({ 
  currentStep, 
  completedSteps = [], 
  onStepClick 
}: SurveyStepIndicatorProps) => {
  const steps = [
    { id: 1, label: "Recommend" },
    { id: 2, label: "Feedback" },
    { id: 3, label: "Manager" },
    { id: 4, label: "Satisfaction" }
  ];

  return (
    <div className="relative pb-6">
      <div className="absolute top-4 left-0 w-full h-1 bg-muted">
        <div 
          className="absolute left-0 h-1 bg-primary transition-all duration-500" 
          style={{ width: `${(completedSteps.length / 4) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        {steps.map(step => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          
          return (
            <button
              key={step.id}
              className="flex flex-col items-center pt-0 focus:outline-none"
              onClick={() => onStepClick?.(step.id)}
              type="button"
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all",
                  isCompleted 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : isActive 
                      ? "bg-white border-primary text-primary" 
                      : "bg-white border-muted text-muted-foreground"
                )}
              >
                {isCompleted ? "✓" : step.id}
              </div>
              <span 
                className={cn(
                  "text-xs font-medium mt-1",
                  isCompleted || isActive
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SurveyStepIndicator;
