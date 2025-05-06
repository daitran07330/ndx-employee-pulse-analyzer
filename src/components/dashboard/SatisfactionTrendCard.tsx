
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENPSData } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SatisfactionTrendCardProps {
  data: ENPSData;
  className?: string;
}

const SatisfactionTrendCard = ({ data, className }: SatisfactionTrendCardProps) => {
  const trendData = [
    {
      name: "Increased",
      value: data.satisfactionTrend.increased,
      color: "#38B2AC", // promoter color
    },
    {
      name: "Stable",
      value: data.satisfactionTrend.stable,
      color: "#ECC94B", // passive color
    },
    {
      name: "Decreased",
      value: data.satisfactionTrend.decreased,
      color: "#E53E3E", // detractor color
    },
  ];

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Satisfaction Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trendData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
              <Tooltip
                formatter={(value) => [`${value}%`, "Percentage"]}
                labelFormatter={() => "Job Satisfaction"}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2 text-sm text-muted-foreground">
          Your job satisfaction at NDX over the past 6 months
        </div>
      </CardContent>
    </Card>
  );
};

export default SatisfactionTrendCard;
