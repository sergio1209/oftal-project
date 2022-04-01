import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterPrescriptionRequest,
  RegisterPrescriptionService,
  ResgisterPrescriptionResponse
} from "../application/registers/register-prescription.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { QueryPresciptionService } from "../application/querys/query-presciption.service";
import { ResgisterDiaryRequest } from "../application/registers/register-diary.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";
import { UpdatePrescriptionService } from "../application/updates/update-prescription.service";
import { Headers } from "@nestjs/common";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('prescription')
@Controller('prescription')
export class PresciptionController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPrescription(@Body() request: ResgisterPrescriptionRequest,@Headers('authorization') token:string){
   // try{
      const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
      if(verifytoken.verifyToken(token)){
       const service: RegisterPrescriptionService = new RegisterPrescriptionService(this._unitOfWork);
  
       return await service.execute(request);
      }else{
        //throw new HttpException('Error 404', 404);
        //return('Error: no se encontró el usuario');
       throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
       //return new HttpStatusCodeResult(HttpStatusCode.NotFound);
      }
  //  }catch (e) {
  //    console.log(e);
  //    return (
     //      'Se ha presentado un error al momento de registrar esta prescription',
  //    );
  //  }
   
   
    
  }
  @Get()
  async queryPrescriptionPaginate(@Query('page') page: number, @Query('keyword') key: string,@Headers('Authorization') token:string){

    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryPresciptionService = new QueryPresciptionService(this._unitOfWork);
      return await service.paginate(page, key);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Get(':id')
  async queryPresciptionService(@Param('id') cedula: string,@Headers('authorization') token:string ){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryPresciptionService = new QueryPresciptionService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put()
  async updatePresciption(@Body() request: ResgisterPrescriptionRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdatePrescriptionService = new UpdatePrescriptionService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    

  }
}