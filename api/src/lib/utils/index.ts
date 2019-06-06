import camelcaseString from "camelcase"
import snakeCaseString from "snake-case"

type GenericObject = { [key: string]: any }

export function camelcase(input: string): string
export function camelcase(input: GenericObject): GenericObject
export function camelcase(input: string | GenericObject): any {
  return typeof input === "string"
    ? camelcaseString(input)
    : Object.keys(input).reduce(
        (acc, key) => {
          acc[camelcaseString(key)] = input[key]
          return acc
        },
        {} as any,
      )
}

export function snakecase(input: string): string
export function snakecase(input: GenericObject): GenericObject
export function snakecase(input: string | GenericObject): any {
  return typeof input === "string"
    ? snakeCaseString(input)
    : Object.keys(input).reduce(
        (acc, key) => {
          acc[snakeCaseString(key)] = input[key]
          return acc
        },
        {} as any,
      )
}
