import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterOphthalmologistRequest,
  RegisterOphthalmologistService
} from "../application/registers/register-ophthalmologist.service";
import { QueryDiaryService } from "../application/querys/query-diary.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";
import { RegisterPatientRequest } from "../application/registers/register-patient.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { UpdateOphthalmologistService } from "../application/updates/update-ophthalmologist.service";


@Controller('ophthalmologist')
export class OphthalmologistController{

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerOphthalmologist(@Body() request: RegisterOphthalmologistRequest){
    const service: RegisterOphthalmologistService = new RegisterOphthalmologistService(this._unitOfWork);
    return await service.execute(request);
  }
  @Get(':id')
  async queryOphthalmologistService(@Param('id') cedula: string ){
    const service: QueryOphthalmologistService = new QueryOphthalmologistService(this._unitOfWork);
    return await service.execute(cedula);
  }
  @Put(':idAnterior')
  async updateOphthalmologist(@Body() request: RegisterOphthalmologistRequest, @Param('idAnterior')idAnterior: number){
    const service: UpdateOphthalmologistService = new UpdateOphthalmologistService(this._unitOfWork);
    return await service.execute(request,idAnterior);
  }
}