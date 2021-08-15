import { TYPE } from './types/types'

import { App } from './app'
import { container } from './config/config'
import { config } from 'dotenv'

config()

function bootstrap(): void {
  const app = container.get<App>(TYPE.app)
  app.listen(process.env.PORT || 3000)
}

bootstrap()
