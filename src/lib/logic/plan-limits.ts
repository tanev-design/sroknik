// Plan limit checks. Pure functions.
// We show inline notices — never block or modal.

import { FREE_PLAN, PLUS_PLAN, type PlanLimitKey } from '$lib/constants/plan';
import type { Plan } from '$lib/types';

export interface LimitState {
  reached: boolean;
  limit: number;
  current: number;
  plan: Plan;
}

export function getLimit(plan: Plan, key: PlanLimitKey): number {
  return plan === 'plus' ? (PLUS_PLAN[key] as number) : (FREE_PLAN[key] as number);
}

export function checkPlanLimit(plan: Plan, key: PlanLimitKey, current: number): LimitState {
  const limit = getLimit(plan, key);
  return {
    reached: current >= limit,
    limit,
    current,
    plan
  };
}

export function canAdd(plan: Plan, key: PlanLimitKey, current: number): boolean {
  return current < getLimit(plan, key);
}
