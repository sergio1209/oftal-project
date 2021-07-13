import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterDiaryRequest,

} from "../application/registers/register-diary.service";
import { RegisterDiaryService } from "../application/registers/register-diary.service";
import { QueryClinicHistoryService } from "../application/querys/query-clinic-history.service";
import { QueryDiaryService } from "../application/querys/query-diary.service";
import { RegisterPatientRequest } from "../application/registers/register-patient.service";
import { UpdatePatientService } from "../application/updates/update-patient.service";
import { UpdateDiaryService } from "../application/updates/update-diary.service";

@Controller('diary')
export class DiaryController {

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerDiary(@Body() request: ResgisterDiaryRequest){
    const service: RegisterDiaryService = new RegisterDiaryService(this._unitOfWork);
    return await service.execute(request);
  }

  @Get(':id')
  async queryDiaryService(@Param('id') cedula: string ){
    const service: QueryDiaryService = new QueryDiaryService(this._unitOfWork);
    return await service.execute(cedula);
  }
  @Put()
  async updateDiary(@Body() request: ResgisterDiaryRequest){
    const service: UpdateDiaryService = new UpdateDiaryService(this._unitOfWork);
    return await service.execute(request);
  }
}