import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { RegisterPatientRequest, RegisterPatientService } from "../application/registers/register-patient.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { QueryPatientService } from "../application/querys/query-patient.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiBasicAuth, ApiHeader, ApiSecurity, ApiTags } from "@nestjs/swagger";
@ApiTags('patient')
@Controller('patient')
export class PatientController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPatient(@Body() request: RegisterPatientRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: RegisterPatientService = new RegisterPatientService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }

  @Get()
  async queryPatientPaginate(@Query('page') page: number, @Query('keyword') key: string,@Headers('Authorization') token:string){

    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryPatientService = new QueryPatientService(this._unitOfWork);
      return await service.paginate(page, key);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }

  @Get(':id')
  async queryPatientService(@Param('id') cedula: string ,@Headers('Authorization') token:string){

    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryPatientService = new QueryPatientService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put(':idAnterior')
  async updatePatient(@Body() request: RegisterPatientRequest, @Param('idAnterior')idAnterior: number,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdatePatientService = new UpdatePatientService(this._unitOfWork);
      return await service.execute(request,idAnterior);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
  
  }
}