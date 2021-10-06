/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { inject, injectable } from 'inversify'

import { TYPE } from '../../types/types'

import { ConfigService } from '../config/services/config.service'

import * as admin from 'firebase-admin'
import { v4 } from 'uuid'

@injectable()
export class FirebaseService {
  /**
   * The firebase storage reference
   */
  public storage: admin.storage.Storage

  constructor(
    @inject(TYPE.configService)
    private readonly configService: ConfigService,
  ) {
    this.init()
  }

  /**
   * Method that can upload some file to the firebase storage
   * @param multerFile stores the multer file data
   * @returns the created file url
   */
  async upload(multerFile: any): Promise<string> {
    return new Promise<string>((res, err) => {
      const filename = v4()
      this.storage
        .bucket()
        .file(filename)
        .createWriteStream({
          metadata: {
            contentType: multerFile.mimetype,
          },
        })
        .on('finish', async () => {
          res(
            this.storage
              .bucket()
              .file(filename)
              .getSignedUrl({ action: 'read', expires: '01-01-2100' })
              .then((values) => values[0]),
          )
        })
        .on('error', err)
        .end(multerFile.buffer)
    })
  }

  private init(): void {
    this.storage = admin
      .initializeApp({
        storageBucket: this.configService.get('FB_STORAGE_BUCKET'),
        credential: admin.credential.cert({
          clientEmail: this.configService.get('FB_CLIENT_EMAIL'),
          privateKey: this.configService
            .get('FB_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          projectId: this.configService.get('FB_PROJECT_ID'),
        }),
      })
      .storage()
  }
}
