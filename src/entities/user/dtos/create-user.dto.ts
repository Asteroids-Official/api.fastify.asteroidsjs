import { IsDefined, IsString } from 'class-validator'

export class CreateUserDto {
  @IsDefined({ message: 'It is required to send the name' })
  @IsString({ message: 'It is required to send a valid string' })
  name: string

  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  email: string

  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
