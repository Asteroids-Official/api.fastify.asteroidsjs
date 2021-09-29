import { inject, injectable } from 'inversify'

import { TYPE } from '../../../types/types'

import { ConfigService } from '../../config/services/config.service'

import * as mongoose from 'mongoose'

@injectable()
export class MongoService {
  constructor(
    @inject(TYPE.configService) private readonly configService: ConfigService,
  ) {
    this.init()
  }

  private async init() {
    try {
      await mongoose.connect(this.configService.get('MONGO_URL'))
    } catch (err) {
      console.error(err)
    }
  }
}
