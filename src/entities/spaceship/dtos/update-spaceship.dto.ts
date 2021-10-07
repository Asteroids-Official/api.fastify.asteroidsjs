import { UpdateColliderDto } from "../../collider/dtos/update-collider.dto";
import { UpdateSpaceshipColorDto } from "../../spaceship-color/dtos/update-spaceship-color.dto";

import { IsArray, IsString, IsOptional, IsBoolean } from 'class-validator'

export class UpdateSpaceshipDto {
  @IsOptional({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name?: string

  @IsOptional({ message: 'It is required to send the colliders' })
  @IsArray({ message: 'It is required to send a valid array' })
  colliders?: UpdateColliderDto[]

  @IsOptional({ message: 'It is required to send the spaceshipColors' })
  @IsArray({ message: 'It is required to send a valid array' })
  spaceshipColors?: UpdateSpaceshipColorDto[]

  @IsOptional({ message: 'It is required to send if is default' })
  @IsBoolean({ message: 'It is required to send a valid boolean' })
  isDefault?: boolean
}
