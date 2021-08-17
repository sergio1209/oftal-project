import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterOphthalmologistRequest,
  RegisterOphthalmologistService
} from "../application/registers/register-ophthalmologist.service";
import { QueryDiaryService } from "../application/querys/query-diary.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { RegisterPatientRequest } from "../application/registers/register-patient.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { UpdateOphthalmologistService } from "../application/updates/update-ophthalmologist.service";
import { AuthUsersService } from "src/application/security/auth-users.service";


@Controller('ophthalmologist')
export class OphthalmologistController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerOphthalmologist(@Body() request: RegisterOphthalmologistRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: RegisterOphthalmologistService = new RegisterOphthalmologistService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Get(':id')
  async queryOphthalmologistService(@Param('id') cedula: string,@Headers('authorization') token:string ){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryOphthalmologistService = new QueryOphthalmologistService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put(':idAnterior')
  async updateOphthalmologist(@Body() request: RegisterOphthalmologistRequest, @Param('idAnterior')idAnterior: number,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdateOphthalmologistService = new UpdateOphthalmologistService(this._unitOfWork);
    return await service.execute(request,idAnterior);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
   
  }
}