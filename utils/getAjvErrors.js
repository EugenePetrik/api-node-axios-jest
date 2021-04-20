export function getAjvErrors(errors) {
  return (errors || [])
    .map(error => {
      try {
        const [, index, fieldName] = /\[(.*)\].(.*)/.exec(error.dataPath);
        return `Error with item #${index}'s field "${fieldName}". The error is: ${error.message}`;
      } catch (error) {
        return error.message;
      }
    })
    .join('\n');
}
