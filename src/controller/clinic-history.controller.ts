import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterClinicHistoryRequest,
  RegisterClinicHistoryService
} from "../application/registers/register-clinic-history.service";
import { QueryAppointmentService } from "../application/querys/query-appointment.service";
import { QueryClinicHistoryService } from "../application/querys/query-clinic-history.service";

@Controller('clinic_History')
export class ClinicHistoryController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerClinicHistory(@Body() request: RegisterClinicHistoryRequest){
    const service: RegisterClinicHistoryService = new RegisterClinicHistoryService(this._unitOfWork);
    return await service.execute(request);
  }

  @Get(':id')
  async queryClinicHistory(@Param('id') cedula: string ){
    const service: QueryClinicHistoryService = new QueryClinicHistoryService(this._unitOfWork);
    return await service.execute(cedula);
  }
}