export const intersperseBy = <T>(
  dividerBy: (item: T, index: number) => T,
  arr: T[]
): T[] =>
  arr.reduce(
    (prev, t, i, all) =>
      i === all.length - 1 ? [...prev, t] : [...prev, t, dividerBy(t, i)],
    [] as T[]
  )
