import multer from 'fastify-multer'
import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from '../../types/types'

@injectable()
export class UploadService {
  private readonly multer = multer()

  constructor(
    @inject(TYPE.fastify)
    fastify: IFastify,
  ) {
    fastify.register(multer.contentParser)
  }

  single(fileName: string): ReturnType<ReturnType<typeof multer>['single']> {
    return this.multer.single(fileName)
  }
}
