// this is the dateFilter. It visualizes the date in a more readable way
// the format of the date is easily adjustable
// source: https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript
export default (value) => {
  const date = new Date(value)
  // date-format (& language) easily adjustable, based on the user's LOCALE(supported by latest browsers)
  return date.toLocaleString(['en-US', 'de-de', 'nl-nl'], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
