const getFilteredFunction = (fieldName, searchText, fn) => {
  return function () {
    return fn(this[fieldName], searchText);
  }
}

export {
  getFilteredFunction
}
