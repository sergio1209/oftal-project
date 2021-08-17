import { RegisterAppointmentRequest, RegisterAppointmentService } from "../application/registers/register-appointment.service";
import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { QueryAppointmentService } from "../application/querys/query-appointment.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { ResgisterDiaryRequest } from "../application/registers/register-diary.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";
import { UpdateAppointmentService } from "../application/updates/update-appoiment.service";
import { AuthUsersService } from "src/application/security/auth-users.service";


@Controller('Appointment')
export class AppointmentController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerAppointment(@Body() request: RegisterAppointmentRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: RegisterAppointmentService = new RegisterAppointmentService(this._unitOfWork);
    return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
   
  }

  @Get(':id')
  async queryAppointmentPatient(@Param('id') cedula: string,@Headers('authorization') token:string ){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryAppointmentService = new QueryAppointmentService(this._unitOfWork);
      return await service.execute(cedula);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
  @Put()
  async updateAppoiment(@Body() request: RegisterAppointmentRequest,@Headers('authorization') token:string){
    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: UpdateAppointmentService = new UpdateAppointmentService(this._unitOfWork);
      return await service.execute(request);
    }else{
     throw new HttpException('Error: no se encontró el usuario', HttpStatus.FORBIDDEN);
    
    }
    
  }
}