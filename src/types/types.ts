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
  passwordService: Symbol('__password_service__'),
  authService: Symbol('__auth_service__'),
  userController: Symbol('__user_controller__'),
  spaceShipColorController: Symbol('__space_ship_color_controller__'),
  spaceShipColorService: Symbol('__space_ship_color_service__'),
  authController: Symbol('__auth_controller__'),
  spaceshipController: Symbol('__spaceship_controller__'),
  spaceshipService: Symbol('__spaceship_service__'),
}

export type IFastify = ReturnType<typeof fastify>
