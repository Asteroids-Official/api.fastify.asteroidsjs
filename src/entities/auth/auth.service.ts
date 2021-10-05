import jwtFastify from 'fastify-jwt'
import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from '../../types/types'

import { UnauthorizedException } from '../../exceptions/unauthorized.exception'

import { LoginDto } from './dtos/login.dto'
import { TokenDto } from './dtos/token.dto'

import { ConfigService } from '../config/services/config.service'
import { PasswordService } from '../password/password.service'
import { UserService } from '../user/services/user.service'

@injectable()
export class AuthService {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.configService)
    private readonly configService: ConfigService,
    @inject(TYPE.passwordService)
    private readonly passwordService: PasswordService,
    @inject(TYPE.userService)
    private readonly userService: UserService,
  ) {
    this.fastify.register(jwtFastify, {
      secret: this.configService.get('JWT_SECRET'),
    })
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const { email, password } = dto
    const user = await this.userService.getOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    const passwordMatches = await this.passwordService.compare(
      password,
      user.password,
    )

    if (!passwordMatches) {
      throw new UnauthorizedException('The username or password are wrong')
    }

    const { _id, name, permissions } = user

    return {
      token: this.fastify.jwt.sign({
        _id,
        name,
        email,
        permissions,
      }),
    }
  }
}
