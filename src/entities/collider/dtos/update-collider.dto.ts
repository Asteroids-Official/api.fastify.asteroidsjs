
import { IsOptional, IsNumber } from 'class-validator'

export class UpdateColliderDto {
  @IsOptional({ message: 'It is required to send the type' })
  @IsNumber()
  type?: number

  @IsOptional({ message: 'It is required to send the localPositionX' })
  @IsNumber()
  localPositionX?: number

  @IsOptional({ message: 'It is required to send the localPositionY' })
  @IsNumber()
  localPositionY?: number

  @IsOptional({ message: 'It is required to send the radius' })
  @IsNumber()
  radius?: number
}
