export interface HeatmapDataPoint {
  confirmationRate: number;
  pickupRate: number;
  maxCpa: number;
}

export interface CalculationResults {
  cogsPercentage: number;
  marginPercentage: number;
  marginValue: number;
  maxCpa: number;
  testBudget: number;
  dailyBudget: number;
}