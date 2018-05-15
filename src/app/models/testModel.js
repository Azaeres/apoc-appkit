import Action from 'models/Action';
import { StateMachine } from 'models/Store';
import idx from 'idx';
import memoize from 'lodash.memoize';
import multiArgResolver from 'util/multiArgResolver';

const ACTION_TYPES = {
  ADVANCE: 'ADVANCE'
};

const stateMachine = StateMachine(
  'initial',
  (value, action) => {
    console.log('> : value', value);
    console.log('> : action', action);
    switch (action.type) {
      case ACTION_TYPES.ADVANCE:
        return action.payload;
      default:
        return value;
    }
  },
  {
    dispatchTest: dispatch => test => {
      dispatch(Action(ACTION_TYPES.ADVANCE, test));
    }
  }
);

const exampleSelector = memoize(
  value => idx(value, _ => _[2]),
  multiArgResolver
);

export default { stateMachine, exampleSelector };

// (function test() {
//   const data = {
//     shop: {
//       taxPercent: 8,
//       items: [{ name: 'apple', value: 1.2 }, { name: 'orange', value: 0.95 }]
//     }
//   };
//   const firstItemInShop = memoize(value => idx(value, _ => _.shop.items[0]));
//   console.log('> : selector(data)', firstItemInShop(data));
// })();
