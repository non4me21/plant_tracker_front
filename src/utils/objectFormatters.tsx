export const snakeToCamel = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            acc[camelKey] = snakeToCamel(obj[key]);
            return acc;
        }, {} as any);
    }
    return obj;
};

export const camelToSnake = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => camelToSnake(item));
    } else if (typeof input === 'object' && input !== null) {
      return Object.keys(input).reduce((acc, key) => {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        acc[snakeKey] = camelToSnake(input[key]);
        return acc;
      }, {} as any);
    }
    return input;
  };

export const formatDate = (date: Date | string): string => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
};