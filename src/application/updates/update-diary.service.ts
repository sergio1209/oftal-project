import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Diary } from "../../domain/entity/diary";
import { ResgisterDiaryRequest, ResgiterDiaryResponse } from "../registers/register-diary.service";
import { RegisterPatientResponse } from "../registers/register-patient.service";

export class UpdateDiaryService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ResgisterDiaryRequest): Promise<ResgiterDiaryResponse>{

    try{
      let searchedDiary: Diary = await this.unitOfWork.diaryRepository.findOne({where: {idPatient: request.idPatient}});
      if (!searchedDiary) {
        return new RegisterPatientResponse(
          'esta agenda no se encuentra registrada',
        );
      }

      searchedDiary.namePatient=request.namePatient;
      searchedDiary.nameOphtalmologist=request.nameOphtalmologist;
      searchedDiary.status=request.status;
      searchedDiary.clinicalOrder=request.clinicalOrder;
        const savedDiary = await this.unitOfWork.diaryRepository.save(searchedDiary);
        if (savedDiary != undefined ) {
          return new ResgiterDiaryResponse(
            'agenda registrada satisfactoriamente'
          );
        }

    }catch (e) {
      console.log(e);
      return new ResgiterDiaryResponse(
        'Se ha presentado un error al momento de registrar esta agenda',
      );
    }

  }
}