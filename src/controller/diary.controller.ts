import { Body, Controller, Post } from "@nestjs/common";
import { UnitOfWork } from "../infrastructure/base/unit.of.work";
import {
  ResgisterDiaryRequest,

} from "../application/register.diary.service";
import { RegisterDiaryService } from "../application/register.diary.service";

@Controller('diary')
export class DiaryController {

  constructor(private readonly _unitOfWork: UnitOfWork) {}

  @Post()
  async registerDiary(@Body() request: ResgisterDiaryRequest){
    const service: RegisterDiaryService = new RegisterDiaryService(this._unitOfWork);
    return await service.execute(request);
  }

}