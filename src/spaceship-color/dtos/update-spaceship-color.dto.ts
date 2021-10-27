import { IsOptional, IsString } from 'class-validator'

export class UpdateSpaceshipColorDto {
  @IsOptional({ message: 'It is required to send the color' })
  @IsString({ message: 'It is required to send a valid string' })
  color?: string

  @IsOptional({ message: 'It is required to send the url' })
  @IsString({ message: 'It is required to send a valid string' })
  url?: string
}
