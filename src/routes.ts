import { injectable, inject } from 'inversify'

import { TYPE } from './types/types'

import { AuthController } from './entities/auth/auth.controller'
import { UploadController } from './entities/upload/upload.controller'
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
    @inject(TYPE.uploadController)
    uploadController: UploadController,
  ) {
    userController.mapRoutes()
    authController.mapRoutes()
    uploadController.mapRoutes()
  }
}
