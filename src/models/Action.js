import isEmpty from 'util/isEmpty';

// https://github.com/acdlite/flux-standard-action
export default function Action(type, payload, meta = {}) {
  if (isEmpty(meta)) {
    return { type, payload };
  } else {
    return { type, payload, meta };
  }
}
