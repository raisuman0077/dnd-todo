const capitalizeFirstLetter = (text) => {
  console.log(text, "yo");
  return text
    .split(/([.?!]\s*)/) // Split while keeping punctuation and spaces
    .map((sentence) => sentence.trim().charAt(0).toUpperCase() + sentence.slice(1))
    .join(""); // Join without adding extra spaces
};
export { capitalizeFirstLetter };
