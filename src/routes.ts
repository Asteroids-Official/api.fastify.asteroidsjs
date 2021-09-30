import { injectable, inject } from 'inversify'

import { TYPE } from './types/types'

import { UserController } from './entities/user/controllers/user.controller'

/**
 * Service that deals with all the application routes.
 */
@injectable()
export class RoutesService {
  constructor(
    @inject(TYPE.userController)
    userController: UserController,
  ) {
    userController.mapRoutes()
  }
}
