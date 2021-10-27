import { injectable, inject } from 'inversify'

import { TYPE } from './common/types/types'

import { AuthController } from './auth/auth.controller'
import { UploadController } from './upload/upload.controller'
import { UserController } from './user/user.controller'

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
