/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */

import { injectable } from 'inversify'

import { Type } from '../common/interfaces/type.interface'
import { plainToClass } from 'class-transformer'

/**
 * Service that transforms some object based on the passed type.
 */
@injectable()
export class TransformService {
  /**
   * Method that transforms some object based on the paramater `type`.
   *
   * @param type defines the tested type.
   * @param value defines an object that represent the object that will be
   * tested.
   * @returns the transformed object.
   */
  transform<T extends Object>(type: Type<T>, value: any): T {
    return plainToClass(type, value)
  }
}
