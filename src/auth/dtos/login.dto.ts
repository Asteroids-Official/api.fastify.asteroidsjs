import { IsDefined, IsString } from 'class-validator'

export class LoginDto {
  @IsDefined({ message: 'It is required to send the email' })
  @IsString({ message: 'It is required to send a valid string' })
  email: string

  @IsDefined({ message: 'It is required to send the password' })
  @IsString({ message: 'It is required to send a valid string' })
  password: string
}
