import { RegisterAppointmentRequest, RegisterAppointmentService } from "../application/registers/register-appointment.service";
import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { QueryAppointmentService } from "../application/querys/query-appointment.service";
import { UpdateAppointmentService } from "../application/updates/update-appoiment.service";
import { AuthUsersService } from "src/application/security/auth-users.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Appointment')
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
  @Get()
  async queryAppointmentaginate(@Query('page') page: number, @Query('keyword') key: string,@Headers('Authorization') token:string){

    const verifytoken: AuthUsersService= new AuthUsersService(this._unitOfWork);
    if(verifytoken.verifyToken(token)){
      const service: QueryAppointmentService = new QueryAppointmentService(this._unitOfWork);
      return await service.paginate(page, key);
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