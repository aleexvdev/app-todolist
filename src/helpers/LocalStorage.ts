export const getStorage = <T>(key: string): T | null => {
  if ( localStorage ) {
    const item = localStorage.getItem(key);
    if ( item ) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Error parsing localStorage item with key '${key}':`, error);
      }
    }
    return null;
  } else {
    console.log('LocalStorage not supported');
    return null;
  }
}

export const putStorage = <T>(key: string, value: T): void => {
  if ( localStorage ) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error serializing value for localStorage key '${key}':`, error);
    }
  } else {
    console.log('LocalStorage not supported');
  }
};