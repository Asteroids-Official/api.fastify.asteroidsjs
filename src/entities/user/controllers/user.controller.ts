import { inject, injectable } from 'inversify'

import { TYPE, IFastify } from '../../../types/types'

import { CreateUserDto } from '../dtos/create-user.dto'

import { UserService } from '../services/user.service'

import { getIdFromRequest } from '../../../utils/request'

@injectable()
export class UserController {
  constructor(
    @inject(TYPE.fastify) private readonly fastify: IFastify,
    @inject(TYPE.userService) private readonly userService: UserService,
  ) {}

  mapRoutes(): void {
    // createOne
    this.fastify.post('/users', async (request, response) => {
      try {
        const user = await this.userService.createOne(
          request.body as CreateUserDto,
        )
        response.send(user)
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
        response.send(user)
      } catch (error) {
        response.status(error.statusCode).send(error)
      }
    })
  }
}
