import values from 'object.values';

// Shims go here
const shims = () => {
  if (!Object.values) {
    values.shim();
  }
}

export default shims;
