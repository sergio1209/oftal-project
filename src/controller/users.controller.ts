import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { RegisterUsersService, ResgisterUsersRequest } from "../application/registers/register-users.service";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiBody, ApiProperty, ApiTags } from "@nestjs/swagger";
@ApiTags('users')
@Controller('users')
export class UsersController{
  constructor(private readonly _unitOfWork: UnitOfWork) {
  }

  @Post('signup')
  async registerUsers(@Body() request: ResgisterUsersRequest, @Headers('authorization') token:string){
    const service: RegisterUsersService = new RegisterUsersService(this._unitOfWork);
    return await service.execute(request);
  }
  @ApiBody({
    schema: {
        type: "object",
        properties: {
            password:{
                type:"string"
            },
            username: {
            
                type: "string",
                
            },
        },
    },
})
  @Post('signin')
  async startSessions(@Body() request: any){
    console.log(request)
    const service: AuthUsersService = new AuthUsersService(this._unitOfWork);
    let user = await service.validateUser(request.username, request.password);
    return await service.login(user);
  }

}
