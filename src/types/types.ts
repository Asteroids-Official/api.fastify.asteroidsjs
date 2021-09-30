import fastify from 'fastify'

export const TYPE = {
  app: Symbol('__app__'),
  fastify: Symbol('__fastify__'),
  routes: Symbol('__routes__'),
  configService: Symbol('__config_service__'),
  userService: Symbol('__user_service__'),
  mongoService: Symbol('__mongo_service__'),
  transformService: Symbol('__transform_service__'),
  validationService: Symbol('__validation_service__'),
  userController: Symbol('__user_controller__'),
}

export type IFastify = ReturnType<typeof fastify>
