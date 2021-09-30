import { inject, injectable } from 'inversify'

import { TYPE } from '../../../types/types'

import { EnvironmentVariables } from '../models/environment-variables.model'

import { ValidationService } from '../../validation/services/validation.service'

import { config } from 'dotenv'

/**
 * Service that deals with the environment variables.
 */
@injectable()
export class ConfigService {
  constructor(
    @inject(TYPE.validationService) validationService: ValidationService,
  ) {
    config()
    validationService.validate(EnvironmentVariables, process.env)
  }

  /**
   * Method that, given a key, it related value.
   *
   * @param key defines a string that represents the environment variable
   * key.
   * @returns the found value.
   */
  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] {
    return process.env[key] as EnvironmentVariables[K]
  }
}
