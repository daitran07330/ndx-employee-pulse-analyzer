
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SurveySummaryCard = ({ className }: { className?: string }) => {
  return (
    <Card className={`${className} animate-fade-in`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">About eNPS Survey</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is-enps">
            <AccordionTrigger>What is eNPS?</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm">
                Employee Net Promoter Score (eNPS) measures employee loyalty and satisfaction by asking how likely they are to recommend their workplace to others. Scores range from -100 to +100, with higher values indicating greater employee satisfaction.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="survey-questions">
            <AccordionTrigger>Survey Questions</AccordionTrigger>
            <AccordionContent>
              <ol className="text-sm list-decimal pl-5 space-y-2">
                <li>How likely are you to recommend NDX as a great place to work to friends or colleagues? (Scale 0-10)</li>
                <li>Based on your answer to Question 1, please share the main reason for your rating.</li>
                <li>Do you feel valued and heard by your direct manager at NDX? (Scale 0-10)</li>
                <li>Your job satisfaction at NDX over the past six (6) months has been... (Increased/Stable/Decreased)</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-calculated">
            <AccordionTrigger>How eNPS is Calculated</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-2">
                Based on their scores to Question 1, employees are categorized into:
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li><span className="font-medium">Promoters (9-10)</span>: Enthusiastic fans who love their job and will actively promote the company</li>
                <li><span className="font-medium">Passives (7-8)</span>: "Just okay" employees who are satisfied but not committed – easily swayed by a better offer</li>
                <li><span className="font-medium">Detractors (0-6)</span>: Unhappy employees who may vent frustration to colleagues or speak negatively about the company online</li>
              </ul>
              <p className="text-sm mt-2">
                The formula is simple: eNPS = (% Promoters) - (% Detractors)
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SurveySummaryCard;
