export const debounce = <F extends FunctionType>(wait: number, fn: F) => {
  let timerId: null | number = null

  return (...args: Arguments<F>): void => {
    if (timerId) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => fn(...args), wait)
  }
}
