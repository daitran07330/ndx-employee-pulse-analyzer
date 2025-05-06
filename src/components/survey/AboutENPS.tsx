
import { Card, CardContent } from "@/components/ui/card";
import { Info, ThumbsUp, ThumbsDown } from "lucide-react";

const AboutENPS = () => {
  return (
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
  );
};

export default AboutENPS;
