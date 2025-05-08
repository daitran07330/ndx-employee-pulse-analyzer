
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const ThankYouCard = () => {
  return (
    <div className="animate-fade-in">
      <Card className="border-0 shadow-lg overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 text-center p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-semibold mb-4">Thank You!</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Your feedback has been submitted successfully and will help us improve DADL.
          </p>
          <Button asChild size="lg" className="px-8">
            <a href="/dashboard">View Results Dashboard</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouCard;
