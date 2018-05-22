import Action from 'models/Action';
import { StateMachine } from 'models/Store';
import idx from 'idx';
import memoize from 'lodash.memoize';
import multiArgResolver from 'util/multiArgResolver';
import produce from 'immer';

const ACTION_TYPES = {
  ADD_PROMISE: 'ADD_PROMISE',
  FULFILL_SUCCESS: 'FULFILL_SUCCESS',
  FULFILL_ERROR: 'FULFILL_ERROR'
};

export function PromiseStateMachine(defaultValue) {
  return StateMachine(
    PromiseStateEmpty(defaultValue),
    produce((draft, action) => {
      // console.log('> reduce: action', action);
      // console.log('> Promise state machine reducer : draft', draft);
      switch (action.type) {
        case ACTION_TYPES.ADD_PROMISE: {
          // console.log(' reducer received > ADD_PROMISE : action', action);
          // console.log('> before: draft', JSON.stringify(draft));
          const { defaultValue } = action.payload;
          Object.assign(draft, PromiseStatePending(defaultValue));
          // console.log('> after: draft', JSON.stringify(draft));
          break;
        }
        case ACTION_TYPES.FULFILL_SUCCESS: {
          // console.log('> reducer rcvd FULFILL_SUCCESS');
          const value = action.payload;
          Object.assign(draft, PromiseStateSuccess(value));
          break;
        }
        case ACTION_TYPES.FULFILL_ERROR: {
          // console.log('> reducer rcvd FULFILL_ERROR');
          const value = action.payload;
          Object.assign(draft, PromiseStateFailure(value));
          break;
        }
        default:
          break;
      }
    }),
    {
      addPromise: ({ dispatch }) => async (promise, defaultValue) => {
        const { fulfillSuccess, fulfillError } = PrivateMethods(dispatch);
        // console.log('> addPromise() ');
        promise.catch(error => {});
        return dispatch(
          Action(ACTION_TYPES.ADD_PROMISE, { defaultValue })
        ).then(value => {
          return promise.then(fulfillSuccess, fulfillError).catch(fulfillError);
        });
      }
    }
  );
}

function PrivateMethods(dispatch) {
  return {
    fulfillSuccess: value => {
      // console.log('> fulfillSuccess: ');
      return dispatch(Action(ACTION_TYPES.FULFILL_SUCCESS, value));
    },
    fulfillError: error => {
      // console.log('> fulfillError');
      return dispatch(Action(ACTION_TYPES.FULFILL_ERROR, error));
    }
  };
}

const STATUSES = {
  EMPTY: 'EMPTY',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

// -----------------------------------------------------------------------------
// Factories

export function PromiseStateEmpty(defaultValue = null) {
  return PromiseState(STATUSES.EMPTY, defaultValue);
}

export function PromiseStatePending(defaultValue = null) {
  return PromiseState(STATUSES.PENDING, defaultValue);
}

export function PromiseStateSuccess(result) {
  return PromiseState(STATUSES.SUCCESS, result);
}

export function PromiseStateFailure(error) {
  return PromiseState(STATUSES.ERROR, error);
}

function PromiseState(status, result) {
  return { status, result };
}

// -----------------------------------------------------------------------------
// Selectors

export const statusFromPromiseState = memoize(
  promiseState => idx(promiseState, _ => _.status),
  multiArgResolver
);

export const resultFromPromiseState = memoize(
  promiseState => idx(promiseState, _ => _.result),
  multiArgResolver
);

// -----------------------------------------------------------------------------
// Predicates

/*
  @function isPending
  @param {PromiseState} promiseState
  @return {boolean}             Returns true if the promise state is pending; false if fulfilled.
 */
export const isPending = memoize(
  promiseState => statusFromPromiseState(promiseState) === STATUSES.PENDING,
  multiArgResolver
);

/*
  @function isSuccessful
  @param {PromiseState} promiseState
  @return {boolean}             Returns true if the promise state is successful; false if not.
 */
export const isSuccessful = memoize(
  promiseState => statusFromPromiseState(promiseState) === STATUSES.SUCCESS,
  multiArgResolver
);

/*
  @function isFailure
  @param {PromiseState} promiseState
  @return {boolean}             Returns true if the promise state is failure; false if not.
 */
export const isFailure = memoize(
  promiseState => statusFromPromiseState(promiseState) === STATUSES.ERROR,
  multiArgResolver
);
