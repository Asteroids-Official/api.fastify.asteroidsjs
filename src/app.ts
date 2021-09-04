import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from './types/types'

import { Routes } from './routes'
import * as mongoose from 'mongoose'

type MongoProvider = () => Promise<typeof mongoose>
@injectable()
export class App {
  private db: typeof mongoose;

  public constructor(
    @inject(TYPE.routes) _routes: Routes,
    @inject(TYPE.fastify) private readonly fastify: IFastify,
    @inject(TYPE.connection) private readonly mongoProvider: MongoProvider,
  ) {
    this.init();
  }

  public listen(port: number | string): void {
    this.fastify.listen(port)
  }

  private async init(): Promise<void> {
    this.db = await this.mongoProvider();
  }
}
