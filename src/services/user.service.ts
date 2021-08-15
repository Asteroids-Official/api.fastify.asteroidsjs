import { injectable } from 'inversify'

import 'reflect-metadata'

@injectable()
export class UserService {
  public getOne(): string {
    return 'Hello World!'
  }
}
