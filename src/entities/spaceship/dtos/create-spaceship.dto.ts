
import { ColliderDto } from "../../collider/dtos/collider.dto"
import { SpaceshipColorDto } from "../../spaceship-color/dtos/spaceship-color.dto"

import { IsDefined, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator'

export class CreateSpaceshipDto {
  @IsDefined({ message: 'It is required to send the colliders' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  @IsDefined({ message: 'It is required to send the name' })
  @IsArray({ message: 'It is required to send a valid array' })
  colliders: ColliderDto[]

  @IsOptional({ message: 'It is required to send the spaceshipColors' })
  @IsArray({ message: 'It is required to send a valid array' })
  spaceshipColors?: SpaceshipColorDto[]

  @IsDefined({ message: 'It is required to send if is default' })
  @IsBoolean({ message: 'It is required to send a valid boolean' })
  isDefault: boolean
}
