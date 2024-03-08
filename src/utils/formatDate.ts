function formatDate(dateString: string) {
  // Create a Date object from the ISO 8601 string
  const date = new Date(dateString);

  // Define the desired format options using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Use the formatter to format the date
  const formattedDate = formatter.format(date);

  return formattedDate;
}

export default formatDate;
