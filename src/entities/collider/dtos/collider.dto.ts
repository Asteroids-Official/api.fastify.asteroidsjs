import { BaseDto } from '../../../shared/base.dto'

export class ColliderDto extends BaseDto {
  type: number
  localPositionX: number
  localPositionY: number
  radius: number
}
