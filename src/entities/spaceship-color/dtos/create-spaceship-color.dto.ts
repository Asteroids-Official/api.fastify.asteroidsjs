import { IsDefined, IsString } from 'class-validator'

export class CreateSpaceshipColorDto {
  @IsDefined({ message: 'It is required to send the color' })
  @IsString({ message: 'It is required to send a valid string' })
  color: string

  @IsDefined({ message: 'It is required to send the url' })
  @IsString({ message: 'It is required to send a valid string' })
  url: string
}
