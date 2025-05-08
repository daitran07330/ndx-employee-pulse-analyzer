
import ModernHeader from "@/components/layout/ModernHeader";

interface SurveyLayoutProps {
  children: React.ReactNode;
}

const SurveyLayout = ({ children }: SurveyLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <ModernHeader />
      
      <main className="container py-6 max-w-7xl mx-auto">
        {children}
      </main>
      
      <footer className="py-4 border-t border-border mt-8">
        <div className="container text-center text-xs text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer</p>
        </div>
      </footer>
    </div>
  );
};

export default SurveyLayout;
