import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EnvVariables {
  @IsString()
  @IsDefined({ message: 'It is required to set the NODE_ENV' })
  @IsIn(['production', 'development', 'test'])
  NODE_ENV: 'production' | 'development' | 'test'

  @IsOptional()
  @IsNumber({}, { message: 'It is required to set the PORT' })
  PORT?: number

  //#region

  @IsString()
  @IsDefined({ message: 'It is required to set the the MONGO_URL' })
  MONGO_URL: string

  //#endregion

  //#region JWT

  @IsString()
  @IsDefined({ message: 'It is required to set the the JWT_SECRET' })
  JWT_SECRET: string

  //#endregion
}
