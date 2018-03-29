export const createPendingAction = actionKey => id => ({ type: actionKey, payload: id });

export const createEmptyAction = actionKey => () => ({ type: actionKey });

export const createErrorAction = actionKey => (error, id) => ({
  type: actionKey,
  payload: { id, error: error instanceof Error ? error.message : error }
});
