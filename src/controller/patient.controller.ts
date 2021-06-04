import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { RegisterPatientRequest, RegisterPatientService } from "../application/registers/register.patient.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { QueryPatientService } from "../application/querys/query-patient.service";

@Controller('patient')
export class PatientController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPatient(@Body() request: RegisterPatientRequest){
    const service: RegisterPatientService = new RegisterPatientService(this._unitOfWork);
    return await service.execute(request);
  }
  @Get(':id')
  async queryPatientService(@Param('id') cedula: string ){
    const service: QueryPatientService = new QueryPatientService(this._unitOfWork);
    return await service.execute(cedula);
  }
}