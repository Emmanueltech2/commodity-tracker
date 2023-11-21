
function getField(report, fieldPath) {
  const parts = (fieldPath || '').split('.');

  return ['fields', ...parts]
    .reduce((prev, fieldName) => {
      if (prev === undefined) {
        return undefined;
      }
      return prev[fieldName];
    }, report);
}

module.exports = {
  getField,
};