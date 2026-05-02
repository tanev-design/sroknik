export const FREE_PLAN = {
  people: 1,
  cars: 1,
  documentSets: 1,
  customDeadlines: 10
} as const;

export const PLUS_PLAN = {
  people: 6,
  cars: 5,
  documentSets: Infinity,
  customDeadlines: Infinity
} as const;

export type PlanLimitKey = keyof typeof FREE_PLAN;
