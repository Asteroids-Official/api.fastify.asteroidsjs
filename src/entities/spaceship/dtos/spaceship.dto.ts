import { BaseDto } from "../../../shared/base.dto";
import { ColliderDto } from "../../collider/dtos/collider.dto";
import { SpaceshipColorDto } from "../../spaceship-color/dtos/spaceship-color.dto";

import { IsDefined, IsArray, IsString, IsOptional, IsBoolean } from 'class-validator'

export class SpaceshipDto extends BaseDto {
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  @IsDefined({ message: 'It is required to send the colliders' })
  @IsArray({ message: 'It is required to send a valid array' })
  colliders: ColliderDto[]

  @IsOptional({ message: 'It is required to send the spaceshipColors' })
  @IsArray({ message: 'It is required to send a valid array' })
  spaceshipColors?: SpaceshipColorDto[]

  @IsOptional({ message: 'It is required to send if is active' })
  @IsBoolean({ message: 'It is required to send a valid boolean' })
  isActive?: boolean

  @IsDefined({ message: 'It is required to send if is default' })
  @IsBoolean({ message: 'It is required to send a valid boolean' })
  isDefault: boolean
}
