import { inject, injectable } from 'inversify'

import { TYPE } from '../../../types/types'

import { EnvironmentVariables } from '../models/environment-variables.model'

import { ValidationService } from '../../validation/services/validation.service'

@injectable()
export class ConfigService {
  constructor(
    @inject(TYPE.validationService) validationService: ValidationService,
  ) {
    validationService.validate(process.env, EnvironmentVariables)
  }

  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] {
    return process.env[key] as EnvironmentVariables[K]
  }
}
