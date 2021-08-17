import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { RegisterUsersService, ResgisterUsersRequest } from "../application/registers/register-users.service";
import { AuthUsersService } from "src/application/security/auth-users.service";

@Controller('users')
export class UsersController{
  constructor(private readonly _unitOfWork: UnitOfWork) {
  }

  @Post('signup')
  async registerUsers(@Body() request: ResgisterUsersRequest, @Headers('authorization') token:string){
    const service: RegisterUsersService = new RegisterUsersService(this._unitOfWork);
    return await service.execute(request);
  }
  @Post('signin')
  async startSessions(@Body() request: any){
    const service: AuthUsersService = new AuthUsersService(this._unitOfWork);
    let user = await service.validateUser(request.username, request.password);
    return await service.login(user);
  }

}
