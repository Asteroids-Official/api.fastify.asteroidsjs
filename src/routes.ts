import { injectable, inject } from 'inversify'

import { TYPE, IFastify } from './types/types'

import { UserController } from './controllers/user.controller'

import 'reflect-metadata'

@injectable()
export class Routes {
  public constructor(
    @inject(TYPE.fastify) private readonly fastify: IFastify,
    @inject(TYPE.userController)
    private readonly userController: UserController,
  ) {
    this.setupUserRoutes()
  }

  private setupUserRoutes(): void {
    this.fastify.get('/users', async () => {
      return this.userController.getOne()
    })
  }
}
