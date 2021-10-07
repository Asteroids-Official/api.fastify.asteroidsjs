import { injectable } from 'inversify'

import { NotFoundException } from '../../../exceptions/not-found.exception'

import { CreateSpaceshipDto } from '../dtos/create-spaceship.dto'
import { SpaceshipDto } from '../dtos/spaceship.dto'
import { UpdateSpaceshipDto } from '../dtos/update-spaceship.dto'
import { SpaceshipModel } from '../models/spaceship.model'

import { IService } from '../../../shared/service.interface'

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
   * @returns an object that represents the created spaceshipColor.
   */
   async createOne(payload: CreateSpaceshipDto): Promise<SpaceshipDto> {
    const spaceshipColor = new SpaceshipModel({
      ...payload,
    })

    const saved = await spaceshipColor.save()
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

    const spaceshipColor = SpaceshipModel.findById(id)
    return spaceshipColor.toObject()
  }

  /**
   * Method that gets all entitys.
   *
   * @returns an array of objects that represents the found entities.
   */
  async getAll(): Promise<SpaceshipDto[]> {
    const spaceshipColors = await SpaceshipModel.find()
    return spaceshipColors.map(item => { item.toObject()})
  }

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

  async enableOne(id: number | string): Promise<SpaceshipDto> {
    const exists = await SpaceshipModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'Spaceship' does not exist or is disabled`,
      )
    }

    const spaceshipColor = await SpaceshipModel.findOneAndUpdate({ _id: `${id}`}, {isActive: true})
    return spaceshipColor
  }

  async getDefault(): Promise<SpaceshipDto> {
    const spaceship = SpaceshipModel.findOne({isDefault: true})
    return spaceship.toObject()
  }
}
