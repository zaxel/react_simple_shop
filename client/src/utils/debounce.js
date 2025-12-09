export default function debounce(func, delay) {
    let timer;
    const debouncedFunction = (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
    debouncedFunction.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    return debouncedFunction;
  }
  