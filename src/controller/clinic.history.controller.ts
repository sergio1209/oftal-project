import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterClinicHistoryRequest,
  RegisterClinicHistoryService
} from "../application/register.clinic.history.service";

@Controller('Clinic_History')
export class ClinicHistoryController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerClinicHistory(@Body() request: RegisterClinicHistoryRequest){
    const service: RegisterClinicHistoryService = new RegisterClinicHistoryService(this._unitOfWork);
    return await service.execute(request);
  }

}