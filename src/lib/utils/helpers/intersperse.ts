export const intersperse = <D, T>(divider: D, array: T[]): (D | T)[] => {
  return array.reduce(
    (acc, v, index) => {
      acc.push(v)
      if (index < array.length - 1) {
        acc.push(divider)
      }
      return acc
    },
    [] as (D | T)[]
  )
}
