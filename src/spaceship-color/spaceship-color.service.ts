import { injectable } from 'inversify'

import { NotFoundException } from '../common/exceptions/not-found.exception'

import { CreateSpaceshipColorDto } from './dtos/create-spaceship-color.dto'
import { SpaceshipColorDto } from './dtos/spaceship-color.dto'
import { UpdateSpaceshipColorDto } from './dtos/update-spaceship-color.dto'
import { SpaceshipColorModel } from './models/spaceship-color.model'

import { IService } from '../common/shared/service.interface'


/**
 * Service that deals with all the business logic related with the `spaceShipcolor`
 * model.
 */
 @injectable()
export class SpaceShipColorService implements IService<SpaceshipColorDto> {

  /**
   * Method that creates a new entity.
   *
   * @param payload defines an object that represents the new entity data.
   * @returns an object that represents the created spaceshipColor.
   */
   async createOne(payload: CreateSpaceshipColorDto): Promise<SpaceshipColorDto> {
    const spaceshipColor = new SpaceshipColorModel({
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
   async getOneById(id: number | string): Promise<SpaceshipColorDto> {
    const exists = await SpaceshipColorModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'SpaceshipColor' does not exist or is disabled`,
      )
    }

    const spaceshipColor = SpaceshipColorModel.findById(id)
    return spaceshipColor.toObject()
  }

  /**
   * Method that gets all entitys.
   *
   * @returns an array of objects that represents the found entities.
   */
  async getAll(): Promise<SpaceshipColorDto[]> {
    const spaceshipColors = await SpaceshipColorModel.find()
    return spaceshipColors.map(item => { item.toObject()})
  }

   /**
   * Method that delete one from entities.
   *
   * @param id represents the entity id.
   */
  async deleteOne(id: number | string): Promise<void> {
    const exists = await SpaceshipColorModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'SpaceshipColor' does not exist or is disabled`,
      )
    }

    SpaceshipColorModel.deleteOne({ _id: `${id}`})
  }

  /**
   * Method that update a entity.
   *
   * @param id represents the entity id.
   * @param payload defines an object that represents the new data for the entity.
   * @returns an object that represents the updated SpaceshipColor.
   */
  async updateOne(id: number | string, payload: UpdateSpaceshipColorDto ): Promise<SpaceshipColorDto> {
    const exists = await SpaceshipColorModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'SpaceshipColor' does not exist or is disabled`,
      )
    }

    const spaceshipColor = await SpaceshipColorModel.findOneAndUpdate({ _id: `${id}`}, payload)
    return spaceshipColor
  }

   /**
   * Method that disable a entity.
   *
   * @param id represents the entity id.
   * @returns an object that represents the disabled SpaceshipColor.
   */
  async disableOne(id: number | string): Promise<SpaceshipColorDto> {
    const exists = await SpaceshipColorModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'SpaceshipColor' does not exist or is disabled`,
      )
    }

    const spaceshipColor = await SpaceshipColorModel.findOneAndUpdate({ _id: `${id}`}, {isActive: false})
    return spaceshipColor
  }

   /**
   * Method that enable a entity.
   *
   * @param id represents the entity id.
   * @returns an object that represents the enabled SpaceshipColor.
   */
  async enableOne(id: number | string): Promise<SpaceshipColorDto> {
    const exists = await SpaceshipColorModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'SpaceshipColor' does not exist or is disabled`,
      )
    }

    const spaceshipColor = await SpaceshipColorModel.findOneAndUpdate({ _id: `${id}`}, {isActive: true})
    return spaceshipColor
  }
}
