
import * as z from "zod";

// Define form schema with zod
export const formSchema = z.object({
  recommendScore: z.string().min(1, "Please select a rating"),
  reasonComment: z.string().min(10, "Please provide at least 10 characters of feedback"),
  managerScore: z.string().min(1, "Please select a rating"),
  satisfactionTrend: z.enum(["increasing", "steady", "declining"], {
    required_error: "Please select a trend",
  }),
  positiveTags: z.array(z.string()).optional(),
  negativeTags: z.array(z.string()).optional(),
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

// Positive themes data
export const positiveThemes = [
  { id: "supportive-coworkers", text: "Supportive coworkers / great teams", count: 130 },
  { id: "good-environment", text: "Good environment / culture / family feel", count: 110 },
  { id: "strong-management", text: "Management (local/lab-level) is strong or caring", count: 85 },
  { id: "flexibility", text: "Flexibility / work-life balance", count: 60 },
  { id: "learning", text: "Learning opportunities / professional development", count: 50 },
  { id: "benefits", text: "Good benefits (insurance, PTO, etc.)", count: 45 },
  { id: "company-values", text: "Company values or mission is appreciated", count: 35 },
  { id: "stable-employment", text: "Stable employment / reliable hours", count: 30 },
  { id: "rewarding-job", text: "Job is rewarding / meaningful work", count: 25 },
  { id: "autonomy", text: "Autonomy / trust from managers", count: 20 },
];

// Negative themes data
export const negativeThemes = [
  { id: "low-pay", text: "Low pay / not competitive / no raises", count: 150 },
  { id: "lack-recognition", text: "Lack of recognition / advancement / pay growth", count: 100 },
  { id: "corporate-disconnect", text: "Corporate disconnect / poor upper management", count: 90 },
  { id: "inconsistent-communication", text: "Inconsistent communication / unclear direction", count: 70 },
  { id: "too-much-change", text: "Too much change / instability / layoffs", count: 60 },
  { id: "favoritism", text: "Favoritism / lack of accountability", count: 50 },
  { id: "understaffed", text: "Understaffed / overworked / burnout", count: 45 },
  { id: "toxic-environment", text: "Toxic work environments / poor morale in some labs", count: 40 },
  { id: "poor-training", text: "Poor training / no onboarding process", count: 30 },
  { id: "broken-systems", text: "Broken systems / outdated equipment / operational challenges", count: 25 },
];
