import Action from 'models/Action';
import Store, { StateMachine } from 'models/Store';
import testModel from 'app/models/testModel';

const { stateMachine } = testModel;

export default {
  ...Store('testStore', stateMachine)
};
