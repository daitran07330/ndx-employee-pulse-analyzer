
import Header from "@/components/layout/Header";
import PageTitle from "@/components/layout/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutENPS = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <PageTitle 
          title="About eNPS Survey" 
          description="Understanding the Employee Net Promoter Score methodology"
          action={
            <Button asChild>
              <Link to="/survey-form">Take Survey</Link>
            </Button>
          }
        />

        <div className="grid gap-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What is eNPS?</h2>
              <p className="mb-4">
                Employee Net Promoter Score (eNPS) measures employee loyalty and satisfaction by asking how likely they are to recommend 
                their workplace to others. Scores range from -100 to +100, with higher values indicating greater employee satisfaction.
              </p>
              <p>
                At NDX, we use eNPS to understand employee sentiment, identify areas for improvement, and track changes in employee 
                satisfaction over time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">How eNPS is Calculated</h2>
              
              <p className="mb-4">
                Based on their scores to the main question ("How likely are you to recommend NDX as a great place to work?"),
                employees are categorized into:
              </p>
              
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-lg mb-1 text-green-700">Promoters (9-10)</h3>
                  <p className="text-sm">Enthusiastic fans who love their job and will actively promote the company</p>
                </div>
                
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-semibold text-lg mb-1 text-yellow-700">Passives (7-8)</h3>
                  <p className="text-sm">"Just okay" employees who are satisfied but not committed – easily swayed by a better offer</p>
                </div>
                
                <div className="border rounded-lg p-4 bg-red-50">
                  <h3 className="font-semibold text-lg mb-1 text-red-700">Detractors (0-6)</h3>
                  <p className="text-sm">Unhappy employees who may vent frustration to colleagues or speak negatively about the company online</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium mb-2">The formula is simple:</h3>
                <p className="text-lg font-semibold">eNPS = (% Promoters) - (% Detractors)</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Passives are included in the total number of respondents but do not directly impact the score.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Survey Questions</h2>
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <span className="font-medium">How likely are you to recommend NDX as a great place to work to friends or colleagues?</span>
                  <p className="text-sm text-muted-foreground">Scale 0-10, from "Not at all likely" (0) to "Extremely likely" (10)</p>
                </li>
                <li>
                  <span className="font-medium">Based on your answer to Question 1, please share the main reason for your rating.</span>
                  <p className="text-sm text-muted-foreground">Open text response</p>
                </li>
                <li>
                  <span className="font-medium">Do you feel valued and heard by your direct manager at NDX?</span>
                  <p className="text-sm text-muted-foreground">Scale 0-10, from "Not at all valued and heard" (0) to "Highly valued and heard" (10)</p>
                </li>
                <li>
                  <span className="font-medium">Your job satisfaction at NDX over the past six (6) months has been...</span>
                  <p className="text-sm text-muted-foreground">Increasing, Steady/about the same, or Declining</p>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Industry Benchmarks</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-xl mb-1">Manufacturing</h3>
                  <p className="text-3xl font-bold text-promoter">+25</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-xl mb-1">Healthcare</h3>
                  <p className="text-3xl font-bold text-promoter">+38</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-xl mb-1">Services</h3>
                  <p className="text-3xl font-bold text-promoter">+15</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="anonymous">
                  <AccordionTrigger>Are my survey responses anonymous?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all survey responses are completely anonymous. Individual responses cannot be traced back to specific employees.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="frequency">
                  <AccordionTrigger>How often is the eNPS survey conducted?</AccordionTrigger>
                  <AccordionContent>
                    NDX conducts the eNPS survey twice a year (every six months) to track changes in employee satisfaction over time.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="results">
                  <AccordionTrigger>How are the results used?</AccordionTrigger>
                  <AccordionContent>
                    Survey results are analyzed to identify trends, areas of strength, and opportunities for improvement. 
                    Leadership teams review the data and develop action plans to address common concerns raised by employees.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="good-score">
                  <AccordionTrigger>What is considered a good eNPS score?</AccordionTrigger>
                  <AccordionContent>
                    Generally, an eNPS above 0 is considered positive, above +10 is good, and above +50 is excellent. 
                    However, these benchmarks can vary by industry. The most important factor is improvement over time.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 NDX Employee Pulse Analyzer</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutENPS;
