
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeData, FeedbackTheme } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ThemesCardProps {
  data: ThemeData;
  className?: string;
}

const ThemesCard = ({ data, className }: ThemesCardProps) => {
  // Format the data for the bar chart
  const formatData = (themes: FeedbackTheme[]) => {
    return themes.map(theme => ({
      name: theme.name,
      count: theme.count,
    })).sort((a, b) => b.count - a.count);
  };

  const positiveData = formatData(data.positive);
  const negativeData = formatData(data.negative);

  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Feedback Themes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="positive">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="positive">Positive Themes</TabsTrigger>
            <TabsTrigger value="negative">Negative Themes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positive" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={positiveData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value} mentions`]} />
                <Bar dataKey="count" fill="#38B2AC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="negative" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={negativeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`${value} mentions`]} />
                <Bar dataKey="count" fill="#E53E3E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ThemesCard;
