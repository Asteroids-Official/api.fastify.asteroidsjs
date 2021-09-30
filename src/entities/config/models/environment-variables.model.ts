import { IsDefined, IsIn, IsString } from 'class-validator'

export class EnvironmentVariables {
  @IsString()
  @IsDefined({
    message: 'It is required to set the NODE_ENV',
  })
  @IsIn(['production', 'development', 'test'])
  NODE_ENV: 'production' | 'development' | 'test'

  //#region

  @IsString()
  @IsDefined({
    message: 'It is required to set the the MONGO_URL',
  })
  MONGO_URL: string

  //#endregion
}
