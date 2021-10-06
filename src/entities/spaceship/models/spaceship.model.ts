import { ColliderDto } from "../../collider/dtos/collider.dto";
import { SpaceshipColorDto } from "../../spaceship-color/dtos/spaceship-color.dto";
import { SpaceshipDto } from "../dtos/spaceship.dto";

import { Schema, model } from "mongoose";

const spaceshipSchema = new Schema<SpaceshipDto>({
  name: { type: String, required: true },
  colliders: [ColliderDto],
  spaceshipColors: [SpaceshipColorDto]
})

export const SpaceshipModel = model('Spaceship', spaceshipSchema)
