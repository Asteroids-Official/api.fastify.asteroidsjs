import { ColliderDto } from '../dtos/collider.dto'

import { Schema, model } from 'mongoose'

const colliderSchema = new Schema<ColliderDto>({
  type: {  type: Number, required: true },
  localPositionX: {  type: Number, required: true },
  localPositionY: {  type: Number, required: true },
  radius: {  type: Number, required: true },
})

export const colliderModel = model('Collider', colliderSchema)
