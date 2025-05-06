
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DepartmentsData {
  departments: Array<{
    name: string;
    score: number;
    responseCount: number;
  }>;
}

const DepartmentsCard: React.FC<{ data: DepartmentsData; className?: string }> = ({ 
  data, 
  className = "" 
}) => {
  // Sort departments by score
  const sortedDepartments = [...data.departments].sort((a, b) => b.score - a.score);

  // Format data for chart
  const chartData = sortedDepartments.map(dept => ({
    name: dept.name,
    score: dept.score,
    responseCount: dept.responseCount,
    fill: dept.score >= 0 ? "#38B2AC" : "#E53E3E"
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Department eNPS Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                domain={[-100, 100]}
                tickCount={5}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => [`${value}`, 'eNPS Score']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="score" 
                barSize={30}
                // This is the fix - use the fill property from each data point
                fill={(entry) => entry.fill}
                radius={[0, 4, 4, 0]}
              >
                <LabelList 
                  dataKey="score" 
                  position="right"
                  formatter={(value: number) => `${value > 0 ? '+' : ''}${value}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Based on {data.departments.reduce((sum, dept) => sum + dept.responseCount, 0)} responses across {data.departments.length} departments.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentsCard;
