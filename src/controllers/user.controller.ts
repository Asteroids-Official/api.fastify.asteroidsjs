import { inject, injectable } from 'inversify'

import { TYPE } from '../types/types'

import { UserService } from '../services/user.service'

@injectable()
export class UserController {
  public constructor(
    @inject(TYPE.userService) private readonly userService: UserService,
  ) {}

  public getOne(): string {
    return this.userService.getOne()
  }
}
