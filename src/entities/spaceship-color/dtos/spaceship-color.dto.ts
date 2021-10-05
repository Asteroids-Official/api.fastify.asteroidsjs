import { BaseDto } from '../../../shared/base.dto'

export class SpaceshipColorDto extends BaseDto {
  _id: string
  url: string
  color: string
  isActive?: boolean
}
