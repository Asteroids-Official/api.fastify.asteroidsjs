import fastify from 'fastify'
import { Container } from 'inversify'

import { TYPE } from '../types/types'

import { AuthService } from '../entities/auth/auth.service'
import { ConfigService } from '../entities/config/services/config.service'
import { MongoService } from '../entities/mongo/services/mongo.service'
import { PasswordService } from '../entities/password/password.service'
import { TransformService } from '../entities/transform/transform.service'
import { UserService } from '../entities/user/services/user.service'
import { ValidationService } from '../entities/validation/services/validation.service'

import { AuthController } from '../entities/auth/auth.controller'
import { UserController } from '../entities/user/controllers/user.controller'

import { App } from '../app'
import { RoutesService } from '../routes'

export const container = new Container()

setupApp()
setupConfig()
setupAuth()
setupUser()

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
