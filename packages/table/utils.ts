export const splitFilter = (str: string, splitValue: string | RegExp) =>
  str.split(splitValue).filter((i) => !!i);

export const separateBySpace = (str: string) => {
  if (str.includes("_")) {
    return splitFilter(str, "_").join(" ").trim();
  }
  return str.replace(/([A-Z])/g, " $1");
};

export const debounce = (fn: Function, delay = 500) => {
  let timer;
  const context = this;
  const args = fn.arguments;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => fn.apply(context, args), delay);
};
