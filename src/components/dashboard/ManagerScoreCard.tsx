
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENPSData } from "@/lib/types";

interface ManagerScoreCardProps {
  data: ENPSData;
  className?: string;
}

const ManagerScoreCard = ({ data, className }: ManagerScoreCardProps) => {
  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 30) return "text-promoter";
    if (score >= 0) return "text-passive";
    return "text-detractor";
  };

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Manager Satisfaction Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4">
          <div
            className={`text-5xl font-bold ${getScoreColor(data.managerScore)}`}
          >
            +{data.managerScore}
          </div>
          <div className="text-muted-foreground mt-4 text-center">
            <p className="mb-2">
              <span className="font-medium">Question:</span> Do you feel valued and heard by your direct manager at NDX?
            </p>
            <p>
              <span className="font-medium">Scale:</span> 0 (Not at all valued and heard) to 10 (Highly valued and heard)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagerScoreCard;
