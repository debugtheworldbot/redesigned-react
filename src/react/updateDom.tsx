const isNew = (prev: HTMLProps, next: HTMLProps) => (key: string) =>
  // @ts-ignore
  prev[key] !== next[key];
const isGone = (prev: HTMLProps, next: HTMLProps) => (key: string) =>
  !(key in next);
const isEvent = (key: string) => key.startsWith("on");
const isProperty = (key: string) => key !== "children" && !isEvent(key);

export const updateDom = (
  dom: HTMLElement | Text,
  prevProps: HTMLProps,
  nextProps: HTMLProps
) => {
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      // @ts-ignore
      dom[name] = "";
    });
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      // @ts-ignore
      dom[name] = nextProps[name];
    });
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      // @ts-ignore
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      // @ts-ignore
      dom.addEventListener(eventType, nextProps[name]);
    });
};
