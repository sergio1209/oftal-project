import { RegisterAppointmentRequest, RegisterAppointmentService } from "../application/registers/register-appointment.service";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { QueryAppointmentService } from "../application/querys/query-appointment.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { ResgisterDiaryRequest } from "../application/registers/register-diary.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";
import { UpdateAppointmentService } from "../application/updates/update-appoiment.service";


@Controller('Appointment')
export class AppointmentController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerAppointment(@Body() request: RegisterAppointmentRequest){
    const service: RegisterAppointmentService = new RegisterAppointmentService(this._unitOfWork);
    return await service.execute(request);
  }

  @Get(':id')
  async queryAppointmentPatient(@Param('id') cedula: string ){
    const service: QueryAppointmentService = new QueryAppointmentService(this._unitOfWork);
    return await service.execute(cedula);
  }
  @Put()
  async updateAppoiment(@Body() request: RegisterAppointmentRequest){
    const service: UpdateAppointmentService = new UpdateAppointmentService(this._unitOfWork);
    return await service.execute(request);
  }
}