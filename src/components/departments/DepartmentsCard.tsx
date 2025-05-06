
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepartmentData } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Legend } from "recharts";

interface DepartmentsCardProps {
  data: DepartmentData;
  className?: string;
}

const DepartmentsCard = ({ data, className }: DepartmentsCardProps) => {
  // Format departments for chart and sort by score
  const sortedDepartments = [...data.departments]
    .sort((a, b) => b.score - a.score);

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0) return "#38B2AC"; // promoter color
    return "#E53E3E"; // detractor color
  };

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Department eNPS Scores</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedDepartments}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis 
              type="number"
              domain={[-40, 40]} 
              tickCount={9}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value, name) => [value > 0 ? `+${value}` : value, "eNPS Score"]} 
              labelFormatter={(label) => `Department: ${label}`}
            />
            <Legend />
            <ReferenceLine x={0} stroke="#666" />
            <Bar 
              dataKey="score" 
              name="eNPS Score"
              radius={[0, 4, 4, 0]}
              fill={(entry) => getScoreColor(entry.score)}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentsCard;
