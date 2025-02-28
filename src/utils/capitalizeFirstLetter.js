const capitalizeFirstLetter = (text) => {
  return text
    .split(/([.?!]\s*)/)
    .map((sentence) => sentence.trim().charAt(0).toUpperCase() + sentence.slice(1))
    .join("");
};
export { capitalizeFirstLetter };
