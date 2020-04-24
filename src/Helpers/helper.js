const noEmptyFields = fields => {
  for (const item in fields) {
    const value = fields[item];

    if (value.trim().length < 1) {
      return false;
    }
  }

  return true;
};

const update = (state, { data, loading }) => {
  return {
    ...state,
    status: "VERIFYING",
    error: null,
    response: null,
    loading
  };
};

const success = (state, { data, loading }) => {
  return {
    ...state,
    status: "READY",
    error: null,
    response: data,
    loading
  };
};

const error = (state, { data, loading }) => {
  return {
    ...state,
    status: "ERROR",
    error: data.message,
    response: null,
    loading
  };
};

export { noEmptyFields, update, success, error };

