
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

function capitalizeFirstLetter(string) {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function titleCaseLetters(str) {
  if (!str) {
    return '';
  }
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function pushFieldsToSingleArray(fields, allFields) {
  for (const field of fields) {
    allFields.push(field);
  }

  return allFields;
}

module.exports = {
  getField,
  capitalizeFirstLetter,
  titleCaseLetters,
  pushFieldsToSingleArray,
};