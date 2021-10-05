import { injectable } from 'inversify'

import * as bcryptjs from 'bcryptjs'

/**
 * Service that deals with the password encryption and comparing logic.
 */
@injectable()
export class PasswordService {
  /**
   * Method that can encrypt some password.
   *
   * @param password stores the password that will be encrypted.
   */
  async encrypt(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt()
    return bcryptjs.hash(password, salt)
  }

  /**
   * Method that can compare two passwords.
   *
   * @param password stores the password that the user is passing.
   * @param hashedPassword stores the hashed password in the database.
   */
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword)
  }
}
