import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  RegisterOphthalmologistRequest,
  RegisterOphthalmologistService
} from "../application/registers/register-ophthalmologist.service";
import { QueryDiaryService } from "../application/querys/query-diary.service";
import { QueryOphthalmologistService } from "../application/querys/query-ophthalmologist.service";


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
}