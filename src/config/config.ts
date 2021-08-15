import fastify from 'fastify'
import { Container } from 'inversify'

import { TYPE } from '../types/types'

import { UserService } from '../services/user.service'

import { UserController } from '../controllers/user.controller'

import { App } from '../app'
import { Routes } from '../routes'

export const container = new Container()

container.bind(TYPE.app).to(App).inSingletonScope()
container.bind(TYPE.routes).to(Routes).inSingletonScope()
container.bind(TYPE.fastify).toConstantValue(fastify())

setupUser()

function setupUser(): void {
  container.bind(TYPE.userController).to(UserController).inSingletonScope()
  container.bind(TYPE.userService).to(UserService).inSingletonScope()
}
