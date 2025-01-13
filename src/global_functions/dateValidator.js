/**
 * Validates if the given date string is a valid, non-past date.
 * @param {string} dateString
 * @returns {boolean}
 */
export function isValidDate(dateString) {
  if (typeof dateString !== "string" || dateString.trim() === "") {
    console.warn("Invalid input: dateString must be a non-empty string.");
    return false;
  }

  const date = new Date(dateString);
  if (!(date instanceof Date) || isNaN(date)) {
    console.warn(`Invalid date: '${dateString}' cannot be parsed.`);
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    console.warn(`Invalid date: '${dateString}' is in the past.`);
    return false;
  }

  return true;
}
