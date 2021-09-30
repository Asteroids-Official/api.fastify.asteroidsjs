import { injectable, inject } from 'inversify'

import { TYPE } from './types/types'

import { UserController } from './entities/user/controllers/user.controller'

@injectable()
export class Routes {
  constructor(
    @inject(TYPE.userController)
    userController: UserController,
  ) {
    userController.mapRoutes()
  }
}
