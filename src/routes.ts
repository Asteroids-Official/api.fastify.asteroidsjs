import { injectable, inject } from 'inversify'

import { TYPE, IFastify } from './types/types'

import { UserController } from './controllers/user.controller'

import { getIdFromRequest } from './utils/requet';

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
    this.fastify.get('/users/:id', async (request) => {
      return this.userController.getOne(getIdFromRequest(request));
    });

    this.fastify.post('/users', async(request) => {
      return this.userController.create(request.body);
    });
  }
}
