import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterClinicHistoryRequest,
  RegisterClinicHistoryService
} from "../application/registers/register-clinic-history.service";
import { QueryClinicHistoryService } from "../application/querys/query-clinic-history.service";
import { UpdateClinicHistoryService } from "../application/updates/update-clinic-history.service";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('clinic_History')
@Controller('clinic_History')
export class ClinicHistoryController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerClinicHistory(@Body() request: RegisterClinicHistoryRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: RegisterClinicHistoryService = new RegisterClinicHistoryService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
  
  }

  @Get(':id')
  async queryClinicHistory(@Param('id') cedula: string ,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryClinicHistoryService = new QueryClinicHistoryService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put()
  async updateClinicHistory(@Body() request: RegisterClinicHistoryRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdateClinicHistoryService = new UpdateClinicHistoryService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
}