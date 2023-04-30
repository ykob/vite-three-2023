export const debounce = (func: () => void, wait: number) => {
  let timeout: number;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};
