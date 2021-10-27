import { inject, injectable } from 'inversify'

import { TYPE } from '../common/types/types'

import { ConfigService } from '../config/config.service'

import * as mongoose from 'mongoose'

/**
 * Service that deals with all the business logic related with the MongoDB
 */
@injectable()
export class MongoService {
  constructor(
    @inject(TYPE.configService) private readonly configService: ConfigService,
  ) {
    this.init()
  }

  /**
   * Method that initializes the mongoose connection.
   */
  private async init() {
    try {
      await mongoose.connect(this.configService.get('MONGO_URL'))
    } catch (err) {
      console.error(err)
    }
  }
}
