import hash from 'object-hash';

export default function multiArgResolver(...args) {
  return hash(args);
}
