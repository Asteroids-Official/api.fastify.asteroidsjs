/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */

import { inject, injectable } from 'inversify'

import { TYPE } from '../common/types/types'

import { BadRequestException } from '../common/exceptions/bad-request.exception'

import { TransformService } from '../transform/transform.service'

import { Type } from '../common/interfaces/type.interface'
import { validateSync } from 'class-validator'

/**
 * Service responsible for validating objects.
 */
@injectable()
export class ValidationService {
  constructor(
    @inject(TYPE.transformService)
    private readonly transformService: TransformService,
  ) {}

  /**
   * Method that validates some object based on the parameter `type`.
   *
   * @param type defines the tested type.
   * @param value defines an object that represent the object that will be
   * tested.
   * @returns the validated object.
   */
  validate<T extends Object>(type: Type<T>, value: any): T {
    const validatedConfig = this.transformService.transform(type, value)

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      throw new Error(errors.toString())
    }

    return validatedConfig
  }

  /**
   * Method that validates some object based on the parameter `type`.
   *
   * @param type defines the tested type.
   * @param value defines an object that represent the object that will be
   * tested.
   * @returns the validated object.
   */
  validateHttp<T extends Object>(type: Type<T>, value: any): T {
    const validatedConfig = this.transformService.transform(type, value)

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      throw new BadRequestException(errors.toString())
    }

    return validatedConfig
  }
}
