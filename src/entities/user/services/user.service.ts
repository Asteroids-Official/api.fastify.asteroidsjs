import { injectable } from 'inversify'

import { CreateUserDto } from '../dtos/create-user.dto'
import { UserDto } from '../dtos/user.dto'
import { UserModel } from '../models/user.model'

import { IService } from '../../../shared/service.interface'

@injectable()
export class UserService implements IService<UserDto> {
  async createOne(payload: CreateUserDto): Promise<UserDto> {
    const user = new UserModel({
      ...payload,
      role: 'common',
    })

    const saved = await user.save()
    return saved.toObject()
  }

  async getOneById(id: number | string): Promise<UserDto> {
    const user = await UserModel.findById(id)
    return user.toObject()
  }
}
