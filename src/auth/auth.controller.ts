import { inject, injectable } from 'inversify'

import { IFastify, TYPE } from '../common/types/types'

import { LoginDto } from './dtos/login.dto'
import { TokenDto } from './dtos/token.dto'

import { TransformService } from '../transform/transform.service'
import { ValidationService } from '../validation/validation.service'
import { AuthService } from './auth.service'

@injectable()
export class AuthController {
  constructor(
    @inject(TYPE.fastify)
    private readonly fastify: IFastify,
    @inject(TYPE.authService)
    private readonly authService: AuthService,
    @inject(TYPE.validationService)
    private readonly validationService: ValidationService,
    @inject(TYPE.transformService)
    private readonly transformService: TransformService,
  ) {}

  mapRoutes(): void {
    this.fastify.post('/auth/login', async (req, res) => {
      const payload = this.validationService.validateHttp(LoginDto, req.body)
      const token = await this.authService.login(payload)
      const proxy = this.transformService.transform(TokenDto, token)

      res.send(proxy)
    })
  }
}
