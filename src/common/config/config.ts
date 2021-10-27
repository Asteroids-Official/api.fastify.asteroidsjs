import fastify from 'fastify'
import { Container } from 'inversify'

import { TYPE } from '../types/types'

import { AuthService } from '../../auth/auth.service'
import { ConfigService } from '../../config/config.service'
import { FirebaseService } from '../../firebase/firebase.service'
import { MongoService } from '../../mongo/mongo.service'
import { PasswordService } from '../../password/password.service'
import { TransformService } from '../../transform/transform.service'
import { UploadService } from '../../upload/upload.service'
import { UserService } from '../../user/user.service'
import { ValidationService } from '../../validation/validation.service'

import { AuthController } from '../../auth/auth.controller'
import { UploadController } from '../../upload/upload.controller'
import { UserController } from '../../user/user.controller'

import { App } from '../../app'
import { RoutesService } from '../../routes'

export const container = new Container()

setupApp()
setupConfig()
setupAuth()
setupUser()
setupUpload()

function setupApp() {
  container.bind(TYPE.app).to(App).inSingletonScope()
  container.bind(TYPE.routes).to(RoutesService).inSingletonScope()
  container.bind(TYPE.fastify).toConstantValue(fastify())
  container.bind(TYPE.mongoService).to(MongoService).inSingletonScope()
}

function setupConfig() {
  container.bind(TYPE.transformService).to(TransformService).inSingletonScope()
  container
    .bind(TYPE.validationService)
    .to(ValidationService)
    .inSingletonScope()
  container.bind(TYPE.configService).to(ConfigService).inSingletonScope()
  container.bind(TYPE.passwordService).to(PasswordService).inSingletonScope()
}

function setupAuth() {
  container.bind(TYPE.authService).to(AuthService).inSingletonScope()
  container.bind(TYPE.authController).to(AuthController).inSingletonScope()
}

function setupUser() {
  container.bind(TYPE.userService).to(UserService).inSingletonScope()
  container.bind(TYPE.userController).to(UserController).inSingletonScope()
}

function setupUpload() {
  container.bind(TYPE.firebaseService).to(FirebaseService).inSingletonScope()
  container.bind(TYPE.uploadService).to(UploadService).inSingletonScope()
  container.bind(TYPE.uploadController).to(UploadController).inSingletonScope()
}
