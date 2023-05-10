export const capitalize = (text: string): string => {
  const textArray = text.split(" ");
  let capitalizedString = "";

  for (const word of textArray) {
    capitalizedString += word.charAt(0).toUpperCase() + word.slice(1);
    if (textArray.indexOf(word) !== textArray.length - 1) capitalizedString += " ";
  }

  return capitalizedString;
};
