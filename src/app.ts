import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from './types/types'

import { ConfigService } from './entities/config/services/config.service'
import { MongoService } from './entities/mongo/services/mongo.service'

import { Routes } from './routes'

@injectable()
export class App {
  constructor(
    @inject(TYPE.routes) _routes: Routes,
    @inject(TYPE.configService) _configService: ConfigService,
    @inject(TYPE.mongoService) _mongoService: MongoService,
    @inject(TYPE.fastify) private readonly fastify: IFastify,
  ) {}

  listen(port: number | string): void {
    this.fastify.listen(port, () => {
      console.log('app started')
    })
  }
}
