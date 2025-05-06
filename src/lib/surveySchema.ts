
import * as z from "zod";

// Define form schema with zod
export const formSchema = z.object({
  recommendScore: z.string().min(1, "Please select a rating"),
  reasonComment: z.string().min(10, "Please provide at least 10 characters of feedback"),
  managerScore: z.string().min(1, "Please select a rating"),
  satisfactionTrend: z.enum(["increasing", "steady", "declining"], {
    required_error: "Please select a trend",
  }),
});

// Helper function to determine score category for styling
export const getScoreCategory = (score: number) => {
  if (score >= 9) return "promoter";
  if (score >= 7) return "passive";
  return "detractor";
};

// Get score label based on category
export const getScoreLabel = (score: number) => {
  const category = getScoreCategory(score);
  if (category === "promoter") return "Excellent";
  if (category === "passive") return "Good";
  return "Needs Improvement";
};

// Generate score options (0-10)
export const scoreOptions = Array.from({ length: 11 }, (_, i) => i);
