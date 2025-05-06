
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getScoreCategory } from "@/lib/surveySchema";

interface ScoreButtonProps {
  score: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const ScoreButton = ({ score, isSelected, isHovered, onClick, children }: ScoreButtonProps) => {
  const category = getScoreCategory(score);
  
  return (
    <Button
      type="button"
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "w-10 h-10 rounded-full transition-all duration-200 hover:scale-110",
        isSelected && category === "promoter" && "bg-green-600 hover:bg-green-600",
        isSelected && category === "passive" && "bg-yellow-500 hover:bg-yellow-500",
        isSelected && category === "detractor" && "bg-red-600 hover:bg-red-600",
        !isSelected && isHovered && category === "promoter" && "border-green-600 text-green-600",
        !isSelected && isHovered && category === "passive" && "border-yellow-500 text-yellow-500",
        !isSelected && isHovered && category === "detractor" && "border-red-600 text-red-600"
      )}
      onClick={onClick}
    >
      {children || score}
    </Button>
  );
};

export default ScoreButton;
