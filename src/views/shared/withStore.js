import { compose, withHandlers, lifecycle, withState } from 'recompose';

export default function withStore(
  store,
  selector = value => value,
  valueName = 'value'
) {
  return compose(
    withState(valueName, 'setValue', store.getValue()),
    withHandlers({
      listener: props => value => {
        props.setValue(selector(value));
      }
    }),
    lifecycle({
      componentDidMount() {
        this.props.setValue(selector(store.getValue()));
        store.subscribe(this.props.listener);
      },
      componentWillUnmount() {
        store.unsubscribe(this.props.listener);
      }
    })
  );
}
