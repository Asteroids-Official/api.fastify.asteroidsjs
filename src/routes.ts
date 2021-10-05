import { injectable, inject } from 'inversify'

import { TYPE } from './types/types'

import { AuthController } from './entities/auth/auth.controller'
import { UserController } from './entities/user/controllers/user.controller'

/**
 * Service that deals with all the application routes.
 */
@injectable()
export class RoutesService {
  constructor(
    @inject(TYPE.userController)
    userController: UserController,
    @inject(TYPE.authController)
    authController: AuthController,
  ) {
    userController.mapRoutes()
    authController.mapRoutes()
  }
}
