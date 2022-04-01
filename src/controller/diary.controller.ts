import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterDiaryRequest,

} from "../application/registers/register-diary.service";
import { RegisterDiaryService } from "../application/registers/register-diary.service";
import { QueryClinicHistoryService } from "../application/querys/query-clinic-history.service";
import { QueryDiaryService } from "../application/querys/query-diary.service";
import { RegisterPatientRequest } from "../application/registers/register-patient.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('diary')
@Controller('diary')
export class DiaryController {

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerDiary(@Body() request: ResgisterDiaryRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: RegisterDiaryService = new RegisterDiaryService(this._unitOfWork);
    return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
   
  }
  @Get()
  async queryDiaryPaginate(@Query('page') page: number, @Query('keyword') key: string,@Headers('Authorization') token:string){

    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryDiaryService = new QueryDiaryService(this._unitOfWork);
      return await service.paginate(page, key);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Get(':id')
  async queryDiaryService(@Param('id') cedula: string,@Headers('authorization') token:string ){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryDiaryService = new QueryDiaryService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put()
  async updateDiary(@Body() request: ResgisterDiaryRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdateDiaryService = new UpdateDiaryService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
}