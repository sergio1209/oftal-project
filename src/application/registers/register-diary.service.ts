import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Diary } from "../../domain/entity/diary";
import { IsInt, IsString } from "class-validator";

export class RegisterDiaryService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ResgisterDiaryRequest): Promise<ResgiterDiaryResponse>{

    try{
      const searchedDiary: Diary = await this.unitOfWork.diaryRepository.findOne({where: {idPatient: request.idPatient}});
      if (searchedDiary == undefined) {
        const newDiary: Diary= new Diary();
        newDiary.idPatient=request.idPatient;
        newDiary.namePatient=request.namePatient;
        newDiary.nameOphtalmologist=request.nameOphtalmologist;
        newDiary.status=request.status;
        newDiary.clinicalOrder=request.clinicalOrder;
        const savedDiary = await this.unitOfWork.diaryRepository.save(newDiary);
        if (savedDiary != undefined ) {
          return new ResgiterDiaryResponse(
            'agenda registrada satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new ResgiterDiaryResponse(
        'Se ha presentado un error al momento de registrar esta agenda',
      );
    }

  }
}

export class ResgisterDiaryRequest {
 @IsInt()
    public idPatient: number;
  @IsString()
  public namePatient:string;
  @IsString()
  public nameOphtalmologist:string;
  @IsString()
  public status: string;
  @IsString()
  public clinicalOrder:string;

}
export class ResgiterDiaryResponse {
  constructor(
    public readonly message: string,

  ) {}
}