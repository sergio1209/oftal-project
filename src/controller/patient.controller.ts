import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import { RegisterPatientRequest, RegisterPatientService } from "../application/register.patient.service";

@Controller('patient')
export class PatientController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPatient(@Body() request: RegisterPatientRequest){
    const service: RegisterPatientService = new RegisterPatientService(this._unitOfWork);
    return await service.execute(request);
  }

}