export function format(timestamp) {
  const rawDate = timestamp?.seconds ? new Date(timestamp.seconds * 1000) : null;

  if (!rawDate) {
    return "just now";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(rawDate);
}
