export interface IService<T> {
  /**
   * Method that creates a new entity.
   *
   * @param payload defines an object that represents the new entity data.
   * @returns an object that represents the created user.
   */
  createOne?(payload: Partial<T>): T | Promise<T>

  createMany?(payload: Partial<T>[]): T[] | Promise<T[]>

  /**
   * Method that gets one entity based on the `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  getOneById?(id: number | string): T | Promise<T>

  deleteOneById?(id: number | string): T | Promise<T>

  updateOneById?(id: number | string): T | Promise<T>
}
