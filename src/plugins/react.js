const useState = (initialValue) => {
  // store private current state
  let _val = initialValue;
  // get the current state
  const state = (() => _val)();
  // update the state
  const setState = (newValue) => {
    _val = newValue;
  };

  return [state, setState];
};

export { useState };
