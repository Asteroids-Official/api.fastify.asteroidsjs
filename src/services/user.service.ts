import { injectable } from 'inversify'

import { User } from '../schemas/user.schema';

@injectable()
export class UserService {
  public getOne(id:string) {
    return User.findById(id);
  }

  public create(payload: any): any{
    const user = new User(payload);
    user.save();
    return '200 - OK';
  }
}
