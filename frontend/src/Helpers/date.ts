export const formatDate = (date: string) => {
  const dateFromString: Date = new Date(date);

  const hours = dateFromString.getHours() < 10 ? "0" + dateFromString.getHours() : dateFromString.getHours();
  const minutes = dateFromString.getMinutes() < 10 ? "0" + dateFromString.getMinutes() : dateFromString.getMinutes();
  const seconds = dateFromString.getSeconds() < 10 ? "0" + dateFromString.getSeconds() : dateFromString.getSeconds();

  const day = dateFromString.getDate() < 10 ? "0" + dateFromString.getDate() : dateFromString.getDate();
  const month = dateFromString.getMonth() < 10 ? "0" + dateFromString.getMonth() : dateFromString.getMonth();
  const year = dateFromString.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};
