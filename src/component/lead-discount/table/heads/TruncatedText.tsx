import React from "react";

interface TruncatedTextProps {
  text?: string | number | null;
  limit?: number; // Optional: default = 30 characters
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, limit = 30 }) => {
  if (text === null || text === undefined || text === "") return <span>N/A</span>;

  // Always convert to string
  const safeText = String(text);

  // Trim by characters instead of words
  const isTruncated = safeText.length > limit;
  const truncated = isTruncated ? safeText.slice(0, limit) + " ..." : safeText;

  return (
    <div className="relative group max-w-[400px] break-words">
      <span
        className="cursor-pointer block whitespace-normal break-words"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {truncated}
      </span>

      {/* Tooltip for full text */}
      {isTruncated && (
        <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg w-96 left-0 top-full mt-1 whitespace-pre-wrap">
          {safeText}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
