export function modulo(modulo: number, value: number): number {
  return ((value % modulo) + modulo) % modulo
}
