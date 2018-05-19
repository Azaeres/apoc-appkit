import Action from 'models/Action';
import { StateMachine } from 'models/Store';
import idx from 'idx';
import memoize from 'lodash.memoize';
import multiArgResolver from 'util/multiArgResolver';
import produce from 'immer';

const ACTION_TYPES = {
  ADVANCE: 'ADVANCE'
};

const stateMachine = StateMachine(
  'initial',
  produce((draft, action) => {
    switch (action.type) {
      case ACTION_TYPES.ADVANCE:
        return action.payload;
      default:
        return draft;
    }
  }),
  {
    dispatchTest: ({ dispatch }) => async test => {
      try {
        await dispatch(Action(ACTION_TYPES.ADVANCE, test));
        // console.log('> success : value', value);
      } catch (error) {
        console.error('> fail: error', error);
      }
    }
  }
);

const exampleSelector = memoize(value => {
  // console.log('> exampleSelector: value', value);
  return idx(value, _ => _[2]);
}, multiArgResolver);

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
