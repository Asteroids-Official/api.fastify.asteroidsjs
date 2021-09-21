import { injectable, inject } from 'inversify'

import { TYPE, IFastify } from './types/types'

import { UserController } from './controllers/user.controller'

import { getIdFromRequest } from './utils/requet';

@injectable()
export class Routes {
  public constructor(
    @inject(TYPE.fastify) private readonly fastify: IFastify,
    @inject(TYPE.userController)
    private readonly userController: UserController,
  ) {
    this.setupUserRoutes()
  }

  private setupUserRoutes(): void {
    this.fastify.get('/users', async (request, response) => {
      try{
        const users = await this.userController.getALl();
        response.send(users);
      }catch(error){
        response.status(error.statusCode).send(error);
     }
    });

    this.fastify.get('/users/:id', async (request, response) => {
      try{
        const user = await this.userController.getOne(getIdFromRequest(request));
        response.send(user);
      }catch(error){
        response.status(error.statusCode).send(error);
      }
    });

    this.fastify.post('/register', async(request, response) => {
     //TODO: hash and salt

     try{
        response.send(this.userController.create(request.body));
     }catch(error){
      response.status(error.statusCode).send(error);
     }
    });

    this.fastify.delete('/users/:id', async (request, response) => {
      try{
        await this.userController.delete(getIdFromRequest(request))
        response.status(200).send();
      }catch(error){
        response.status(error.statusCode).send(error);
      }
    });
  }
}
