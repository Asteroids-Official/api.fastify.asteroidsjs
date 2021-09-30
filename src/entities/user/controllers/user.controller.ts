import { inject, injectable } from 'inversify'

import { TYPE, IFastify } from '../../../types/types'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UserDto } from '../dtos/user.dto'

import { TransformService } from '../../transform/transform.service'
import { ValidationService } from '../../validation/services/validation.service'
import { UserService } from '../services/user.service'

import { getIdFromRequest } from '../../../utils/request'

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

  mapRoutes(): void {
    // createOne
    this.fastify.post('/users', async (request, response) => {
      try {
        const payload = this.validationService.validate(
          CreateUserDto,
          request.body,
        )
        const user = await this.userService.createOne(payload)
        const proxy = this.transformService.transform(UserDto, user)

        response.send(proxy)
      } catch (error) {
        console.error(error)
        response.status(error.statusCode).send(error)
      }
    })

    // getOneById
    this.fastify.get('/users/:id', async (request, response) => {
      try {
        const user = await this.userService.getOneById(
          getIdFromRequest(request),
        )
        response.send(this.transformService.transform(UserDto, user))
      } catch (error) {
        console.error(error)
        response.status(error.statusCode).send(error)
      }
    })
  }
}
