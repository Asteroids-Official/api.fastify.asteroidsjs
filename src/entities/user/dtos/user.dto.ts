import { BaseDto } from '../../../shared/base.dto'

import { Exclude, Expose } from 'class-transformer'

export class UserDto extends BaseDto {
  _id: string
  name: string
  score: number
  email: string

  @Exclude()
  password: string

  @Expose({
    name: 'permissions',
  })
  roles: string[]
}
