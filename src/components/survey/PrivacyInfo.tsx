
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const PrivacyInfo = () => {
  return (
    <Card className="border border-border/50 bg-white/90 backdrop-blur-sm shadow-sm">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Your Privacy
        </h2>
        <p className="text-sm">
          All responses are anonymous and will be used only in aggregate to help improve the employee experience at NDX.
          Individual responses cannot be traced back to you.
        </p>
      </CardContent>
    </Card>
  );
};

export default PrivacyInfo;
