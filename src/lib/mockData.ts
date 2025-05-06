
import { ENPSData, ThemeData, DepartmentData } from "./types";

export const enpsData: ENPSData = {
  overallScore: -9,
  totalResponses: 987,
  industryBenchmarks: {
    manufacturing: 25,
    healthcare: 38,
    services: 15,
  },
  breakdown: {
    promoters: 25,
    passives: 41,
    detractors: 34,
  },
  managerScore: 28,
  satisfactionTrend: {
    increased: 28,
    stable: 55,
    decreased: 17,
  },
};

export const themeData: ThemeData = {
  positive: [
    { name: "Supportive colleagues / great team", count: 130 },
    { name: "Good environment / culture / family feel", count: 110 },
    { name: "Strong or caring management (local/lab)", count: 85 },
    { name: "Flexibility / work-life balance", count: 60 },
    { name: "Learning / professional development opportunities", count: 50 },
    { name: "Good benefits (insurance, PTO, etc.)", count: 45 },
    { name: "Company values or mission appreciated", count: 35 },
    { name: "Job stability / reliable hours", count: 30 },
    { name: "Fulfilling / meaningful work", count: 25 },
    { name: "Autonomy / trust from management", count: 20 },
  ],
  negative: [
    { name: "Low / non-competitive pay / no raises", count: 150 },
    { name: "Lack of recognition / advancement / raises", count: 100 },
    { name: "Disconnection from corporate / poor senior management", count: 90 },
    { name: "Inconsistent communication / unclear direction", count: 70 },
    { name: "Too much change / instability / layoffs", count: 60 },
    { name: "Favoritism / lack of accountability", count: 50 },
    { name: "Understaffing / overwork / burnout", count: 45 },
    { name: "Toxic work environment / poor morale in some labs", count: 40 },
    { name: "Poor training / no onboarding process", count: 30 },
    { name: "Outdated systems / equipment / operational challenges", count: 25 },
  ],
};

// Simulated department data - renamed responses to responseCount
export const departmentData: DepartmentData = {
  departments: [
    { name: "Lab Operations", score: -12, responseCount: 245 },
    { name: "Customer Support", score: 5, responseCount: 98 },
    { name: "Research & Development", score: 15, responseCount: 120 },
    { name: "Sales & Marketing", score: -5, responseCount: 110 },
    { name: "Finance & Accounting", score: -18, responseCount: 85 },
    { name: "HR & Administration", score: 8, responseCount: 70 },
    { name: "IT & Technical Support", score: -15, responseCount: 95 },
    { name: "Executive Leadership", score: -30, responseCount: 42 },
    { name: "Quality Assurance", score: -2, responseCount: 122 },
  ],
};
