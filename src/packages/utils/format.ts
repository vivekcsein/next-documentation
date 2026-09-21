const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export const formatDate = (iso: string): string =>
  dateFormatter.format(new Date(iso));

export const formatReadingTime = (minutes: number): string =>
  `${minutes} min read`;
