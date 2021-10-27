import { inject, injectable } from 'inversify'

import { TYPE } from '../common/types/types'

import { EnvVariables } from './models/env-variables.model'

import { ValidationService } from '../validation/validation.service'

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
    validationService.validate(EnvVariables, process.env)
  }

  /**
   * Method that, given a key, it related value.
   *
   * @param key defines a string that represents the environment variable
   * key.
   * @returns the found value.
   */
  get<K extends keyof EnvVariables>(key: K): EnvVariables[K] {
    return process.env[key] as EnvVariables[K]
  }
}
