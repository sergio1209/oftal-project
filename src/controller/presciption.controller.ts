import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterPrescriptionRequest,
  RegisterPrescriptionService
} from "../application/registers/register-prescription.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { QueryPresciptionService } from "../application/querys/query-presciption.service";
import { ResgisterDiaryRequest } from "../application/registers/register-diary.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";
import { UpdatePrescriptionService } from "../application/updates/update-prescription.service";

@Controller('prescription')
export class PresciptionController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPrescription(@Body() request: ResgisterPrescriptionRequest){
    const service: RegisterPrescriptionService = new RegisterPrescriptionService(this._unitOfWork);
    return await service.execute(request);
  }
  @Get(':id')
  async queryPresciptionService(@Param('id') cedula: string ){
    const service: QueryPresciptionService = new QueryPresciptionService(this._unitOfWork);
    return await service.execute(cedula);
  }
  @Put()
  async updatePresciption(@Body() request: ResgisterPrescriptionRequest){
    const service: UpdatePrescriptionService = new UpdatePrescriptionService(this._unitOfWork);
    return await service.execute(request);
  }
}