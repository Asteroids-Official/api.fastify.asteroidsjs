import fastify from 'fastify'

export const TYPE = {
  app: Symbol('__app__'),
  fastify: Symbol('__fastify__'),
  routes: Symbol('__routes__'),
  userController: Symbol('__user_controller__'),
  userService: Symbol('__user_service__'),
  connection: Symbol('__mongo_connection__'),
}

export type IFastify = ReturnType<typeof fastify>
