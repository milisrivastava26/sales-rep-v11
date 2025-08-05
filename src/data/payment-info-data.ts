export function getCurrentDateFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
}

export const pageSize = [20, 40, 60, 100];

export function formatIndianNumber(num: number | string): string {
  const str = num.toString().replace(/[^0-9]/g, ''); // Ensure only digits
  const lastThree = str.slice(-3);
  const otherDigits = str.slice(0, -3);
 
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
 
  return otherDigits ? `${formattedOther},${lastThree}` : lastThree;
}