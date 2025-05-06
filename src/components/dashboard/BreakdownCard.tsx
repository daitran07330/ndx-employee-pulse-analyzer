
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENPSData } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface BreakdownCardProps {
  data: ENPSData;
  className?: string;
}

const BreakdownCard = ({ data, className }: BreakdownCardProps) => {
  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Response Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-promoter mr-2"></div>
                <span>Promoters (9-10)</span>
              </div>
              <span className="font-medium">{data.breakdown.promoters}%</span>
            </div>
            <Progress value={data.breakdown.promoters} className="h-2 bg-gray-200" />
            <div className="text-xs text-muted-foreground mt-1">Enthusiastic advocates</div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-passive mr-2"></div>
                <span>Passives (7-8)</span>
              </div>
              <span className="font-medium">{data.breakdown.passives}%</span>
            </div>
            <Progress value={data.breakdown.passives} className="h-2 bg-gray-200" />
            <div className="text-xs text-muted-foreground mt-1">Satisfied but unenthusiastic</div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-detractor mr-2"></div>
                <span>Detractors (0-6)</span>
              </div>
              <span className="font-medium">{data.breakdown.detractors}%</span>
            </div>
            <Progress value={data.breakdown.detractors} className="h-2 bg-gray-200" />
            <div className="text-xs text-muted-foreground mt-1">Unhappy employees</div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 mt-4">
            <div className="text-sm">eNPS Formula:</div>
            <div className="font-medium mt-1">
              {data.breakdown.promoters}% Promoters - {data.breakdown.detractors}% Detractors = {data.overallScore} eNPS
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakdownCard;
