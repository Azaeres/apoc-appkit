/**
 * http://stackoverflow.com/questions/4994201/is-object-empty
 */

// Speed up calls to hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj === null || obj === undefined) {
    return true;
  }

  const size = objSize(obj);
  if (size > 0) {
    return false;
  } else if (size === 0) {
    return true;
  }

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function objSize(obj) {
  if (typeof obj.size === 'number') {
    return obj.size;
  } else if (typeof obj.count === 'function') {
    return obj.count();
  } else if (typeof obj.length === 'number') {
    return obj.length;
  }
}
