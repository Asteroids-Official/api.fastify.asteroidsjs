import fastify from 'fastify'
import { Container, interfaces } from 'inversify'

import { TYPE } from '../types/types'

import { UserService } from '../services/user.service'

import { UserController } from '../controllers/user.controller'

import { App } from '../app'
import { Routes } from '../routes'
import * as mongoose from 'mongoose'

export const container = new Container()

container.bind(TYPE.app).to(App).inSingletonScope()
container.bind(TYPE.routes).to(Routes).inSingletonScope()
container.bind(TYPE.fastify).toConstantValue(fastify())
container.bind(TYPE.connection).toProvider<typeof mongoose>(() => {
  return (async () => {
    try {
      return await mongoose.connect('mongodb+srv://admin:admin@cluster0.qgfmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    }catch(err) {
      console.error(err);
    }
  });
})

// const provider = container.get<Promise<typeof mongoose>>()

setupUser()

function setupUser(): void {
  container.bind(TYPE.userController).to(UserController).inSingletonScope()
  container.bind(TYPE.userService).to(UserService).inSingletonScope()
}
