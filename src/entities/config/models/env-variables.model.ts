import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class EnvVariables {
  @IsDefined({ message: 'It is required to set the NODE_ENV' })
  @IsString({ message: 'It is required to set a valid string' })
  @IsIn(['production', 'development', 'test'])
  NODE_ENV: 'production' | 'development' | 'test'

  @IsOptional()
  @IsNumber({}, { message: 'It is required to set the PORT' })
  PORT?: number

  //#region

  @IsDefined({ message: 'It is required to set the MONGO_URL' })
  @IsString({ message: 'It is required to set a valid string' })
  MONGO_URL: string

  //#endregion

  //#region JWT

  @IsDefined({ message: 'It is required to set the JWT_SECRET' })
  @IsString({ message: 'It is required to set a valid string' })
  JWT_SECRET: string

  //#endregion

  //#region Firebase

  @IsDefined({ message: 'It is required to set the firebase client email' })
  @IsString({ message: 'It is required to set a valid string' })
  FB_CLIENT_EMAIL: string

  @IsDefined({ message: 'It is required to set the firebase private key' })
  @IsString({ message: 'It is required to set a valid string' })
  FB_PRIVATE_KEY: string

  @IsDefined({ message: 'It is required to set the firebase project id' })
  @IsString({ message: 'It is required to set a valid string' })
  FB_PROJECT_ID: string

  @IsDefined({ message: 'It is required to set the firebase storage bucket' })
  @IsString({ message: 'It is required to set a valid string' })
  FB_STORAGE_BUCKET: string

  //#endregion
}
