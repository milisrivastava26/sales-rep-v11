type StorageObject = { [key: string]: any };
 
export function saveToLocalStorage(key: string, obj: StorageObject): void {
  try {
    const jsonString = JSON.stringify(obj);
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}
 
export function retrieveFromLocalStorage(key: string): StorageObject | null {
  try {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
}
