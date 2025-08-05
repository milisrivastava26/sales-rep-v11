export const highlightText = (text: string | number, query: string) => {
  const safeText = String(text); // Convert number, null, etc. to string

  if (!query) return safeText;

  const regex = new RegExp(`(${query})`, "gi");

  return (
    <span>
      {safeText.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};
