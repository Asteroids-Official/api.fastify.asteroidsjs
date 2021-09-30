import 'reflect-metadata'

import { TYPE } from './types/types'

import { ConfigService } from './entities/config/services/config.service'

import { App } from './app'
import { container } from './config/config'

function bootstrap(): void {
  const app = container.get<App>(TYPE.app)

  const configService = container.get<ConfigService>(TYPE.configService)

  app.listen(configService.get('PORT') || 3000)
}

bootstrap()
