import { injectable } from 'inversify'

import { EnvironmentVariables } from '../models/environment-variables.model'

import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

@injectable()
export class ConfigService {
  constructor() {
    this.validate(process.env)
  }

  get<K extends keyof EnvironmentVariables>(key: K): EnvironmentVariables[K] {
    return process.env[key] as EnvironmentVariables[K]
  }

  private validate(config: Record<string, unknown>): EnvironmentVariables {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    })
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      console.error(errors.toString())
      throw new Error(errors.toString())
    }
    return validatedConfig
  }
}
