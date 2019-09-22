/*
  Returns the first argument number rounded down to the
  nearest number in the second argument array.
  If no matches, returns lowest number.
*/
const FloorToList = (num, arr) => {
  const possible = arr.filter(n => n <= num)
  return possible.length
    ? Math.max(...possible)
    : Math.min(...arr)
}

/*
  Returns the first argument number rounded up to the
  nearest number in the second argument array.
  If no matches, returns largest number.
*/
const CeilToList = (num, arr) => {
  const possible = arr.filter(n => n >= num)
  return possible.length
    ? Math.min(...possible)
    : Math.max(...arr)
}

export { CeilToList, FloorToList }