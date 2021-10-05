import { inject, injectable } from 'inversify'

import { TYPE, IFastify } from '../../../types/types'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UserDto } from '../dtos/user.dto'

import { TransformService } from '../../transform/transform.service'
import { ValidationService } from '../../validation/services/validation.service'
import { UserService } from '../services/user.service'

import { getIdFromRequest } from '../../../utils/request'

/**
 * Controller that deals with all the routes related with the `user`
 * entities.
 */
@injectable()
export class UserController {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.validationService)
    private readonly validationService: ValidationService,
    @inject(TYPE.transformService)
    private readonly transformService: TransformService,
    @inject(TYPE.userService)
    private readonly userService: UserService,
  ) {}

  /**
   * Method that setups all the entity related routes.
   */
  mapRoutes(): void {
    // createOne
    this.fastify.post('/users', async (req, res) => {
      const payload = this.validationService.validateHttp(
        CreateUserDto,
        req.body,
      )
      const user = await this.userService.createOne(payload)
      const proxy = this.transformService.transform(UserDto, user)

      res.send(proxy)
    })

    // getOneById
    this.fastify.get('/users/:id', async (req, res) => {
      const user = await this.userService.getOneById(getIdFromRequest(req))

      const proxy = this.transformService.transform(UserDto, user)
      res.send(proxy)
    })
  }
}
