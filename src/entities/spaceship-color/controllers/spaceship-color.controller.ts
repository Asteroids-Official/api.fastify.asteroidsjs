import { inject, injectable } from 'inversify'

import { TYPE, IFastify } from '../../../types/types'

import { CreateSpaceshipColorDto } from '../dtos/create-spaceship-color.dto'
import { SpaceshipColorDto } from '../dtos/spaceship-color.dto'
import { UpdateSpaceshipColorDto } from '../dtos/update-spaceship-color.dto'

import { TransformService } from '../../transform/transform.service'
import { ValidationService } from '../../validation/services/validation.service'
import { SpaceShipColorService } from '../services/spaceship-color.service'

import { getIdFromRequest } from '../../../utils/request'

/**
 * Controller that deals with all the routes related with the `spaceShipcolor`
 * entities.
 */
@injectable()
export class SpaceShipColorController {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.validationService)
    private readonly validationService: ValidationService,
    @inject(TYPE.transformService)
    private readonly transformService: TransformService,
    @inject(TYPE.spaceShipColorService)
    private readonly spaceShipColorService: SpaceShipColorService,
  ){}

  /**
   * Method that setups all the entity related routes.
   */
  mapRoutes(): void {
    // createOne
    this.fastify.post('/spaceship-colors', async (request, response) => {
      const payload = this.validationService.validateHttp(
        CreateSpaceshipColorDto,
        request.body,
      )

      const spaceshipColor = this.spaceShipColorService.createOne(payload);
      const proxy = this.transformService.transform(SpaceshipColorDto, spaceshipColor)

      response.send(proxy)
    })

    // getOneById
    this.fastify.get('/spaceship-colors/:id', async (request, response) => {
      const spaceshipColor = await this.spaceShipColorService.getOneById(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipColorDto, spaceshipColor)
      response.send(proxy)
    })

    // getAll
    this.fastify.get('/spaceship-colors', async (request, response) => {
      const spaceshipColors = await this.spaceShipColorService.getAll()

      const proxy = spaceshipColors.map(s => { this.transformService.transform(SpaceshipColorDto, s)})

      response.send(proxy)
    })

    // deleteOne
    this.fastify.delete('/spaceship-colors/:id', async (request, response) => {
      await this.spaceShipColorService.deleteOne(getIdFromRequest(request))
      response.send()
    })

    // updateOne
    this.fastify.patch('/spaceship-colors/:id', async (request, response) => {
      const payload = this.validationService.validateHttp(
        UpdateSpaceshipColorDto,
        request.body,
      )
      const spaceshipColor = await this.spaceShipColorService.updateOne(getIdFromRequest(request), payload)

      const proxy = this.transformService.transform(SpaceshipColorDto, spaceshipColor)
      response.send(proxy)
    })

    // disableOne
    this.fastify.patch('/spaceship-colors/:id/disable', async (request, response) => {
      const spaceshipColor = await this.spaceShipColorService.disableOne(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipColorDto, spaceshipColor)
      response.send(proxy)
    })

    // enableOne
    this.fastify.patch('/spaceship-colors/:id/enable', async (request, response) => {
      const spaceshipColor = await this.spaceShipColorService.enableOne(getIdFromRequest(request))

      const proxy = this.transformService.transform(SpaceshipColorDto, spaceshipColor)
      response.send(proxy)
    })
  }
}
