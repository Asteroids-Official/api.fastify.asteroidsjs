import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from './types/types'

import { Routes } from './routes'

import 'reflect-metadata'

@injectable()
export class App {
  public constructor(
    @inject(TYPE.routes) _routes: Routes,
    @inject(TYPE.fastify) private readonly fastify: IFastify,
  ) {}

  public listen(port: number | string): void {
    this.fastify.listen(port)
  }
}
