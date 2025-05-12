export function formatLabel(str: string) {
    if (!str) return "";
  
    // Insert space before each uppercase letter (excluding the first char)
    const withSpaces = str.replace(/([A-Z])/g, " $1");
  
    // Capitalize the first letter and trim leading space if any
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }
  