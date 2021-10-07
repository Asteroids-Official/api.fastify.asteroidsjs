import { inject, injectable } from 'inversify'

import { TYPE, IFastify } from '../../../types/types'


import { CreateSpaceshipDto } from '../dtos/create-spaceship.dto'
import { SpaceshipDto } from '../dtos/spaceship.dto'
import { UpdateSpaceshipDto } from '../dtos/update-spaceship.dto'

import { TransformService } from '../../transform/transform.service'
import { ValidationService } from '../../validation/services/validation.service'
import { SpaceshipService } from '../services/spaceship.service'

import { getIdFromRequest } from '../../../utils/request'

/**
 * Controller that deals with all the routes related with the `spaceship`
 * entities.
*/
@injectable()
export class SpaceshipController {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.validationService)
    private readonly validationService: ValidationService,
    @inject(TYPE.transformService)
    private readonly transformService: TransformService,
    @inject(TYPE.spaceshipService)
    private readonly spaceshipService: SpaceshipService,
  ){}

 /**
   * Method that setups all the entity related routes.
   */
  mapRoutes(): void {
    // createOne
    this.fastify.post('/spaceship', async (request, response) => {
      const payload = this.validationService.validateHttp(
        CreateSpaceshipDto,
        request.body,
      )

      const spaceship = this.spaceshipService.createOne(payload);
      const proxy = this.transformService.transform(SpaceshipDto, spaceship)

      response.send(proxy)
    })

    // getOneById
    this.fastify.get('/spaceship/:id', async (request, response) => {
      const spaceship = await this.spaceshipService.getOneById(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipDto, spaceship)
      response.send(proxy)
    })

    // getAll
    this.fastify.get('/spaceship', async (request, response) => {
      const spaceships = await this.spaceshipService.getAll()

      const proxy = spaceships.map(s => { this.transformService.transform(SpaceshipDto, s)})

      response.send(proxy)
    })

    // deleteOne
    this.fastify.delete('/spaceship/:id', async (request, response) => {
      await this.spaceshipService.deleteOne(getIdFromRequest(request))
      response.send()
    })

    // updateOne
    this.fastify.patch('/spaceship-colors/:id', async (request, response) => {
      const payload = this.validationService.validateHttp(
        UpdateSpaceshipDto,
        request.body,
      )
      const spaceshipColor = await this.spaceshipService.updateOne(getIdFromRequest(request), payload)

      const proxy = this.transformService.transform(SpaceshipDto, spaceshipColor)
      response.send(proxy)
    })

    // disableOne
    this.fastify.patch('/spaceship/:id/disable', async (request, response) => {
      const spaceship= await this.spaceshipService.disableOne(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipDto, spaceship)
      response.send(proxy)
    })

    // enableOne
    this.fastify.patch('/spaceship/:id/enable', async (request, response) => {
      const spaceship = await this.spaceshipService.enableOne(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipDto, spaceship)
      response.send(proxy)
    })

    // spaceship/default
    this.fastify.get('/spaceship/default', async (request, response) => {
      const spaceship = await this.spaceshipService.getDefault()

      const proxy = this.transformService.transform(SpaceshipDto, spaceship)
      response.send(proxy)
    })
  }
}
