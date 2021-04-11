import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterOphthalmologistRequest,
  RegisterOphthalmologistService
} from "../application/register.ophthalmologist.service";


@Controller('ophthalmologist')
export class OphthalmologistController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerOphthalmologist(@Body() request: RegisterOphthalmologistRequest){
    const service: RegisterOphthalmologistService = new RegisterOphthalmologistService(this._unitOfWork);
    return await service.execute(request);
  }

}