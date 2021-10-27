import 'reflect-metadata'

import { TYPE } from './common/types/types'

import { ConfigService } from './config/config.service'

import { App } from './app'
import { container } from './common/config/config'

function bootstrap(): void {
  const app = container.get<App>(TYPE.app)

  const configService = container.get<ConfigService>(TYPE.configService)

  app.listen(configService.get('PORT') || 3000)
}

bootstrap()
