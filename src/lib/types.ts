
export interface ENPSData {
  overallScore: number;
  totalResponses: number;
  industryBenchmarks: {
    manufacturing: number;
    healthcare: number;
    services: number;
  };
  breakdown: {
    promoters: number;
    passives: number;
    detractors: number;
  };
  managerScore: number;
  satisfactionTrend: {
    increased: number;
    stable: number;
    decreased: number;
  };
}

export interface FeedbackTheme {
  name: string;
  count: number;
}

export interface ThemeData {
  positive: FeedbackTheme[];
  negative: FeedbackTheme[];
}

export interface Department {
  name: string;
  score: number;
  responses: number;
}

export interface DepartmentData {
  departments: Department[];
}
