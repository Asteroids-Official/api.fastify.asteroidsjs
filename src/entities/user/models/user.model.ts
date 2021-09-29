import { UserDto } from '../dtos/user.dto'

import { Schema, model } from 'mongoose'

const userSchema = new Schema<UserDto>({
  name: { type: String, required: true },
  score: { type: Number, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
})

export const UserModel = model('User', userSchema)
