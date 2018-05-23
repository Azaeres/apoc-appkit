import { compose, withHandlers, lifecycle, withState, pure } from 'recompose';

export default function withStore(
  store,
  selector = value => value,
  valueName = 'value'
) {
  return compose(
    withState(valueName, 'setValue', selector(store.value)),
    withHandlers({
      listener: props => (value, previousValue) => {
        props.setValue(selector(value));
      }
    }),
    lifecycle({
      componentWillMount() {
        this.props.setValue(selector(store.value));
        store.getValue().then(value => {
          this.props.setValue(selector(value));
        });
        store.subscribe(this.props.listener);
      },
      componentWillUnmount() {
        store.unsubscribe(this.props.listener);
      }
    }),
    pure
  );
}
