import { UserDto } from '../dtos/user.dto'

import { Schema, model } from 'mongoose'

const userSchema = new Schema<Omit<UserDto, 'permissions'> & { role: string }>({
  name: { type: String, required: true },
  score: { type: Number, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
})

export const UserModel = model('User', userSchema)
