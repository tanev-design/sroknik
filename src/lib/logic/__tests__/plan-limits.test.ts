import { describe, it, expect } from 'vitest';
import { checkPlanLimit, canAdd, getLimit } from '../plan-limits';

describe('plan limits — free plan', () => {
  it('enforces single car', () => {
    expect(getLimit('free', 'cars')).toBe(1);
    expect(canAdd('free', 'cars', 0)).toBe(true);
    expect(canAdd('free', 'cars', 1)).toBe(false);
    expect(checkPlanLimit('free', 'cars', 1).reached).toBe(true);
  });

  it('enforces single person', () => {
    expect(canAdd('free', 'people', 0)).toBe(true);
    expect(canAdd('free', 'people', 1)).toBe(false);
  });

  it('enforces 10 custom deadlines', () => {
    expect(canAdd('free', 'customDeadlines', 9)).toBe(true);
    expect(canAdd('free', 'customDeadlines', 10)).toBe(false);
  });

  it('enforces single document set', () => {
    expect(canAdd('free', 'documentSets', 0)).toBe(true);
    expect(canAdd('free', 'documentSets', 1)).toBe(false);
  });
});

describe('plan limits — plus plan', () => {
  it('allows 6 people, 5 cars', () => {
    expect(getLimit('plus', 'people')).toBe(6);
    expect(getLimit('plus', 'cars')).toBe(5);
    expect(canAdd('plus', 'people', 5)).toBe(true);
    expect(canAdd('plus', 'people', 6)).toBe(false);
  });
  it('is effectively unlimited for documents & custom deadlines', () => {
    expect(canAdd('plus', 'documentSets', 99_999)).toBe(true);
    expect(canAdd('plus', 'customDeadlines', 99_999)).toBe(true);
  });
});
