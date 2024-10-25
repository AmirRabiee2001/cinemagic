export function extractTime(timeString) {
  const regex = /(\d+)h\s*(\d+)m/;
  const match = timeString.match(regex);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return { hours, minutes };
  } else {
    return null; // Handle the case where the format is not matched
  }
}
