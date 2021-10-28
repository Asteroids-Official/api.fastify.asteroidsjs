import { injectable } from 'inversify'

import { NotFoundException } from '../common/exceptions/not-found.exception'

import { CreateSpaceshipDto } from './dtos/create-spaceship.dto'
import { SpaceshipDto } from './dtos/spaceship.dto'
import { UpdateSpaceshipDto } from './dtos/update-spaceship.dto'
import { SpaceshipModel } from './models/spaceship.model'

import { IService } from '../common/shared/service.interface'

/**
 * Service that deals with all the business logic related with the `spaceship`
 * model.
 */

@injectable()
export class SpaceshipService implements IService<SpaceshipDto>{
  /**
   * Method that creates a new entity.
   *
   * @param payload defines an object that represents the new entity data.
   * @returns an object that represents the created Spaceship.
   */
   async createOne(payload: CreateSpaceshipDto): Promise<SpaceshipDto> {
    const spaceship = new SpaceshipModel({
      ...payload,
    })

    const saved = await spaceship.save()
    return saved.toObject()
  }

  /**
   * Method that gets one entity based on the `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
   async getOneById(id: number | string): Promise<SpaceshipDto> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    const spaceship = SpaceshipModel.findById(id)
    return spaceship.toObject()
  }

  /**
   * Method that gets all entitys.
   *
   * @returns an array of objects that represents the found entities.
   */
  async getAll(): Promise<SpaceshipDto[]> {
    const spaceship = await SpaceshipModel.find()
    return spaceship.map(item => { item.toObject()})
  }

  /**
   * Method that delete one from entities.
   *
   * @param id represents the entity id.
   */
  async deleteOne(id: number | string): Promise<void> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    SpaceshipModel.deleteOne({ _id: `${id}`})
  }

  /**
   * Method that update a entity.
   *
   * @param id represents the entity id.
   * @param payload defines an object that represents the new data for the entity.
   * @returns an object that represents the updated Spaceship.
   */
  async updateOne(id: number | string, payload: UpdateSpaceshipDto ): Promise<SpaceshipDto> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    const spaceship = await SpaceshipModel.findOneAndUpdate({ _id: `${id}`}, { update: payload })
    return spaceship
  }

  /**
   * Method that disable a entity.
   *
   * @param id represents the entity id.
   * @returns an object that represents the disabled Spaceship.
   */
  async disableOne(id: number | string): Promise<SpaceshipDto> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    const spaceship = await SpaceshipModel.findOneAndUpdate({ _id: `${id}`}, {isActive: false})
    return spaceship
  }

  /**
   * Method that enable a entity.
   *
   * @param id represents the entity id.
   * @returns an object that represents the enabled Spaceship.
   */
  async enableOne(id: number | string): Promise<SpaceshipDto> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    const spaceship = await SpaceshipModel.findOneAndUpdate({ _id: `${id}`}, {isActive: true})
    return spaceship
  }

  /**
   * Method that get the default entity.
   *
   * @returns an object that represents the default Spaceship.
   */
  async getDefault(): Promise<SpaceshipDto> {
    const spaceship = SpaceshipModel.findOne({isDefault: true})
    return spaceship.toObject()
  }
}
