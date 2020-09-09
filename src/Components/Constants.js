const SWAPI = "https://swapi.dev/api/";

const debounce = (func, delay) => {
  let debounceTimer;
  return () => {
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

export { SWAPI, debounce };
