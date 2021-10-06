import { BaseDto } from "../../../shared/base.dto";
import { ColliderDto } from "../../collider/dtos/collider.dto";
import { SpaceshipColorDto } from "../../spaceship-color/dtos/spaceship-color.dto";

import { IsDefined, IsArray, IsString, IsOptional } from 'class-validator'

export class SpaceshipDto extends BaseDto {
  @IsDefined({ message: 'It is required to send the id' })
  @IsString({ message: 'It is required to send a valid string' })
  _id: string

  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  @IsDefined({ message: 'It is required to send the colliders' })
  @IsArray({ message: 'It is required to send a valid array' })
  colliders: ColliderDto[]

  @IsOptional({ message: 'It is required to send the spaceshipColors' })
  @IsArray({ message: 'It is required to send a valid array' })
  spaceshipColors?: SpaceshipColorDto[]
}
