import Action from 'models/Action';
import { StateMachine } from 'models/Store';
import idx from 'idx';
import memoize from 'lodash.memoize';
import multiArgResolver from 'util/multiArgResolver';
import produce from 'immer';

const ACTION_TYPES = {
  TOGGLE: 'TOGGLE',
  INCREMENT_COUNTER: 'INCREMENT_COUNTER'
};

export default function ObjectExample(counter = 0, toggle = false) {
  return {
    foo: 'foo',
    counter,
    thing: {
      bar: 'bar',
      toggle,
      arr: ['baz']
    }
  };
}

const initialValue = ObjectExample();
Object.freeze(initialValue);

export const stateMachine = StateMachine(
  initialValue,
  produce((draft, action) => {
    switch (action.type) {
      case ACTION_TYPES.TOGGLE:
        draft.thing.toggle = !draft.thing.toggle;
        break;
      case ACTION_TYPES.INCREMENT_COUNTER:
        // 4. reducer -> value
        draft.counter++;
        break;
      default:
        break;
    }
  }),
  {
    toggle: ({ dispatch }) => () => {
      dispatch(Action(ACTION_TYPES.TOGGLE));
    },
    incrementCounter: ({ dispatch }) => () => {
      // 3. dispatcher -> reducer
      dispatch(Action(ACTION_TYPES.INCREMENT_COUNTER));
    }
  }
);

export const toggleSelector = memoize(
  value => idx(value, _ => _.thing.toggle),
  multiArgResolver
);

export const counterSelector = memoize(
  value => idx(value, _ => _.counter),
  multiArgResolver
);
