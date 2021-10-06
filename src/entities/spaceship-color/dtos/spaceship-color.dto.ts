import { BaseDto } from '../../../shared/base.dto'

import { IsDefined, IsString, IsOptional, IsBoolean } from 'class-validator'
export class SpaceshipColorDto extends BaseDto {
  @IsDefined({ message: 'It is required to send the url' })
  @IsString({ message: 'It is required to send a valid string' })
  url: string

  @IsDefined({ message: 'It is required to send the color' })
  @IsString({ message: 'It is required to send a valid string' })
  color: string

  @IsOptional({ message: 'It is required to send if is active' })
  @IsBoolean({ message: 'It is required to send a valid boolean' })
  isActive?: boolean
}
