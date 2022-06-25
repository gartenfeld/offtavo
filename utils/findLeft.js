// Given a sorted array of values, return the index of
//   the largest value that is less than or equal to `max`
const findLeft = (sortedList, max) => {
  if (!sortedList.length) {
    return -1;
  }
  const indexOfFirstGreaterValue = sortedList.findIndex((value) => {
    return value > max;
  });
  // When the first value is greater
  if (indexOfFirstGreaterValue === 0) {
    // No value is less than or equal to `max`
    return -1;
  }
  // When no value in the list is greater
  if (indexOfFirstGreaterValue === -1) {
    // The last value is the largest that fits
    return sortedList.length - 1;
  }
  // Otherwise it's the value to the left of the found index
  return indexOfFirstGreaterValue - 1;
};

export { findLeft };
