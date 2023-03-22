export function groupBy<T, K extends keyof T>(array: T[], key: K | ((item: T) => K)): Record<string, T[]> {
  return array.reduce((result, currentValue) => {
    const groupingKey = typeof key === 'function' ? key(currentValue) : currentValue[key];
    (result[groupingKey as string] ||= []).push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}
