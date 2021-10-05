import { inject, injectable } from 'inversify'

import { TYPE } from '../../../types/types'

import { ConflictException } from '../../../exceptions/conflict.exception'
import { NotFoundException } from '../../../exceptions/not-found.exception'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UserDto } from '../dtos/user.dto'
import { UserModel } from '../models/user.model'

import { IService } from '../../../shared/service.interface'
import { PasswordService } from '../../password/password.service'

/**
 * Service that deals with all the business logic related with the `user`
 * model.
 */
@injectable()
export class UserService implements IService<UserDto> {
  constructor(
    @inject(TYPE.passwordService)
    private readonly passwordService: PasswordService,
  ) {}

  /**
   * Method that creates a new entity.
   *
   * @param payload defines an object that represents the new entity data.
   * @returns an object that represents the created user.
   */
  async createOne(payload: CreateUserDto): Promise<UserDto> {
    const password = await this.passwordService.encrypt(payload.password)

    const exists = await this.hasWithEmail(payload.email)
    if (exists) {
      throw new ConflictException('An user with this email already exists')
    }

    const user = new UserModel({
      ...payload,
      password,
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

  /**
   * Method that gets one entity based on the `email`
   * parameter.
   *
   * @param email defines the entity unique email.
   * @returns an object that represents the found entity.
   */
  async getOneByEmail(email: string): Promise<UserDto> {
    const exists = await this.hasWithEmail(email)

    if (!exists) {
      throw new NotFoundException(
        `The entity identified by '${email}' of type 'User' does not exist or is disabled`,
      )
    }

    const user = await UserModel.findOne({ email })
    return user.toObject()
  }

  /**
   * Method that validates if some email already exists.
   *
   * @param email defines the email
   * @returns
   */
  private async hasWithEmail(email: string): Promise<boolean> {
    return UserModel.exists({
      email,
    })
  }
}
