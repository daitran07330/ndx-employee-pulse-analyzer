
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENPSData } from "@/lib/types";

interface ScoreCardProps {
  data: ENPSData;
  className?: string;
}

const ScoreCard = ({ data, className }: ScoreCardProps) => {
  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 30) return "text-promoter";
    if (score >= 0) return "text-passive";
    return "text-detractor";
  };

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Overall eNPS Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-4">
          <div
            className={`text-6xl font-bold ${getScoreColor(data.overallScore)}`}
          >
            {data.overallScore > 0 ? `+${data.overallScore}` : data.overallScore}
          </div>
          <div className="text-muted-foreground mt-2 text-center">
            Based on {data.totalResponses} employee responses
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">Industry Benchmarks</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Manufacturing</span>
              <span className="font-medium text-promoter">+{data.industryBenchmarks.manufacturing}</span>
            </div>
            <div className="flex justify-between">
              <span>Healthcare</span>
              <span className="font-medium text-promoter">+{data.industryBenchmarks.healthcare}</span>
            </div>
            <div className="flex justify-between">
              <span>Services</span>
              <span className="font-medium text-promoter">+{data.industryBenchmarks.services}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
