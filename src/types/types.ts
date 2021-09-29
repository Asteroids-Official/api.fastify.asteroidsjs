import fastify from 'fastify'

export const TYPE = {
  app: Symbol('__app__'),
  fastify: Symbol('__fastify__'),
  routes: Symbol('__routes__'),
  configService: Symbol('__config_service__'),
  userController: Symbol('__user_controller__'),
  userService: Symbol('__user_service__'),
  mongoService: Symbol('__mongo_service__'),
}

export type IFastify = ReturnType<typeof fastify>
