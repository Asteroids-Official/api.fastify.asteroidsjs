import fastify from 'fastify'
import { Container } from 'inversify'

import { TYPE } from '../types/types'

import { ConfigService } from '../entities/config/services/config.service'
import { MongoService } from '../entities/mongo/services/mongo.service'
import { UserService } from '../entities/user/services/user.service'

import { UserController } from '../entities/user/controllers/user.controller'

import { App } from '../app'
import { Routes } from '../routes'

export const container = new Container()

setupApp()
setupConfig()
setupUser()

function setupApp() {
  container.bind(TYPE.app).to(App).inSingletonScope()
  container.bind(TYPE.routes).to(Routes).inSingletonScope()
  container.bind(TYPE.fastify).toConstantValue(fastify())
  container.bind(TYPE.mongoService).to(MongoService).inSingletonScope()
}

function setupConfig() {
  container.bind(TYPE.configService).to(ConfigService).inSingletonScope()
}

function setupUser() {
  container.bind(TYPE.userService).to(UserService).inSingletonScope()
  container.bind(TYPE.userController).to(UserController).inSingletonScope()
}
