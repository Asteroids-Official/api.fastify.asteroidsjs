import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from '../../types/types'

import { FirebaseService } from '../firebase/firebase.service'
import { UploadService } from './upload.service'

@injectable()
export class UploadController {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.uploadService)
    private readonly uploadService: UploadService,
    @inject(TYPE.firebaseService)
    private readonly firebaseService: FirebaseService,
  ) {}

  mapRoutes(): void {
    this.fastify.post(
      '/upload',
      {
        preHandler: this.uploadService.single('file'),
      },
      async (req, res) => {
        const url = await this.firebaseService.upload((req as any).file)
        res.send({
          url,
        })
      },
    )
  }
}
