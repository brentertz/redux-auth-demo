import { createSelector } from 'reselect';

export function propertySelector(selector, prop) {
  return createSelector(selector, (state) => state.get(prop));
};
