export function throttle<T extends (...args: any[]) => void>(
  func: T,
  threshold: number = 250
): T {
  let last: number, deferTimer: number
  return function(this: any) {
    let now = Date.now(),
      args = arguments
    if (last && now < last + threshold) {
      clearTimeout(deferTimer)
      deferTimer = window.setTimeout(function() {
        last = now
        func(args)
      }, threshold)
    } else {
      last = now
      func(args)
    }
  } as T
}
