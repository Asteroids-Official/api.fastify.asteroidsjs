import { SpaceshipColorDto } from '../dtos/spaceship-color.dto'

import { Schema, model } from 'mongoose'

const spaceshipColorSchema = new Schema<SpaceshipColorDto>({
  color: { type: String, required: true },
  url: { type: String, required: true },
  isActive: { type: Boolean, require: false, default: true},
})

export const SpaceshipColorModel = model('SpaceshipColor', spaceshipColorSchema)
