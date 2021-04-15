import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterPrescriptionRequest,
  RegisterPrescriptionService
} from "../application/register.prescription.service";

@Controller('prescription')
export class PresciptionController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerPrescription(@Body() request: ResgisterPrescriptionRequest){
    const service: RegisterPrescriptionService = new RegisterPrescriptionService(this._unitOfWork);
    return await service.execute(request);
  }

}