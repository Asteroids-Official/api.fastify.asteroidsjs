import { injectable } from 'inversify'

import { NotFoundException } from '../../../exceptions/not-found.exception'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UserDto } from '../dtos/user.dto'
import { UserModel } from '../models/user.model'

import { IService } from '../../../shared/service.interface'

/**
 * Service that deals with all the business logic related with the `user`
 * model.
 */
@injectable()
export class UserService implements IService<UserDto> {
  /**
   * Method that creates a new entity.
   *
   * @param payload defines an object that represents the new entity data.
   * @returns an object that represents the created user.
   */
  async createOne(payload: CreateUserDto): Promise<UserDto> {
    const user = new UserModel({
      ...payload,
      role: 'common',
    })

    const saved = await user.save()
    return saved.toObject()
  }

  /**
   * Method that gets one entity based on the `id` parameter.
   *
   * @param id defines the entity unique identifier.
   * @returns an object that represents the found entity.
   */
  async getOneById(id: number | string): Promise<UserDto> {
    const exists = await UserModel.exists({
      _id: `${id}`,
    })

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${id}' of type 'User' does not exist or is disabled`,
      )
    }

    const user = UserModel.findById(id)
    return user.toObject()
  }
}
