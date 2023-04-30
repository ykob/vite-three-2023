export const throttle = (func: (e?: any) => void, wait: number) => {
  let timeout: number;
  return (e: any) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = 0;
        func(e);
      }, wait);
    }
  };
};
