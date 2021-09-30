import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from './types/types'

import { ConfigService } from './entities/config/services/config.service'
import { MongoService } from './entities/mongo/services/mongo.service'

import { RoutesService } from './routes'

/**
 * The application main class.
 */
@injectable()
export class App {
  constructor(
    @inject(TYPE.routes)
    _routes: RoutesService,
    @inject(TYPE.configService)
    _configService: ConfigService,
    @inject(TYPE.mongoService)
    _mongoService: MongoService,
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
  ) {
    fastify.setErrorHandler((error, _, reply) => {
      reply.status(error.statusCode ?? 500).send(error)
    })
  }

  /**
   * Method that starts the application.
   *
   * @param port defines the port where the application will be executed.
   */
  listen(port: number | string): void {
    this.fastify.listen(port, () => {
      console.log('app started')
    })
  }
}
