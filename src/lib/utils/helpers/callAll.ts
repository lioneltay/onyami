export const callAll = (...funcs: ((...args: any) => void)[]) => (
  ...args: any
): void => {
  funcs.forEach(f => f(...args))
}
