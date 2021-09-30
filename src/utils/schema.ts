export type TypeToDef<T> = {
  [P in keyof T]?: Record<string, unknown>
}
