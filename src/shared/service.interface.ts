export interface IService<T> {
  createOne?(payload: Partial<T>): T | Promise<T>

  createMany?(payload: Partial<T>[]): T[] | Promise<T[]>

  getOneById?(id: number | string): T | Promise<T>

  deleteOneById?(id: number | string): T | Promise<T>

  updateOneById?(id: number | string): T | Promise<T>
}
