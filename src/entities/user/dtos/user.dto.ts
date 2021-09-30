import { BaseDto } from '../../../shared/base.dto'

import { Exclude, Expose, Transform } from 'class-transformer'

export class UserDto extends BaseDto {
  _id: string
  name: string
  score: number
  email: string

  @Exclude()
  password: string

  @Expose({ name: 'role' })
  @Transform((params) => params.value.split('|'))
  permissions: string
}
