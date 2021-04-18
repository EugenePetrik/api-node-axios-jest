expect.extend({
  toBeValid(isValid, errorMessage) {
    return {
      message: () => isValid ? '' : errorMessage,
      pass: isValid
    };
  },
});
