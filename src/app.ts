import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from './types/types'

import { Routes } from './routes'
import * as mongoose from 'mongoose'

type MongoProvider = () => Promise<typeof mongoose>
@injectable()
export class App {
  public constructor(
    @inject(TYPE.routes) _routes: Routes,
    @inject(TYPE.fastify) private readonly fastify: IFastify,
    @inject(TYPE.connection) private readonly mongoProvider: MongoProvider,
  ) {}

  public listen(port: number | string): void {
    this.fastify.listen(port)
    this.mongoProvider().then((response) => { response.model})
  }
}
