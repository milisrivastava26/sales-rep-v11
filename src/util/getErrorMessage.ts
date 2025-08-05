export const getMessageAfterColon = (input: string): string => {
  const colonIndex = input.indexOf(":");
  return colonIndex !== -1 ? input.slice(colonIndex + 1).trim() : input;
};
