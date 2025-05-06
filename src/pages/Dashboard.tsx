
import { enpsData, themeData, departmentData } from "@/lib/mockData";
import ModernHeader from "@/components/layout/ModernHeader";
import PageTitle from "@/components/layout/PageTitle";
import ScoreCard from "@/components/dashboard/ScoreCard";
import BreakdownCard from "@/components/dashboard/BreakdownCard";
import ManagerScoreCard from "@/components/dashboard/ManagerScoreCard";
import SatisfactionTrendCard from "@/components/dashboard/SatisfactionTrendCard";
import ThemesCard from "@/components/feedback/ThemesCard";
import DepartmentsCard from "@/components/departments/DepartmentsCard";
import SurveySummaryCard from "@/components/dashboard/SurveySummaryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="container py-8">
        <PageTitle 
          title="Employee Pulse Dashboard" 
          description="Analyzing employee satisfaction and engagement from the latest eNPS survey."
        />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-3 h-12">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="themes">Feedback Themes</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ScoreCard data={enpsData} className="md:col-span-1" />
              <BreakdownCard data={enpsData} className="md:col-span-1" />
              <SurveySummaryCard className="md:col-span-2 xl:col-span-1" />
              <SatisfactionTrendCard data={enpsData} className="md:col-span-1" />
              <ManagerScoreCard data={enpsData} className="md:col-span-1" />
            </div>
          </TabsContent>
          
          {/* Feedback Themes Tab */}
          <TabsContent value="themes" className="animate-slide-in">
            <ThemesCard data={themeData} />
          </TabsContent>
          
          {/* Departments Tab */}
          <TabsContent value="departments" className="animate-slide-in">
            <DepartmentsCard data={departmentData} />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-5 border-t border-border">
        <div className="container text-center text-xs text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer - Based on survey with {enpsData.totalResponses} responses</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
