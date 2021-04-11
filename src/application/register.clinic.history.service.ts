import { IUnitOfWork } from "../infrastructure/contracts/i.unit.of.work";
import { Ophthalmologist } from "../domain/entity/ophthalmologist";
import { ClinicHistory } from "../domain/entity/clinic.history";

export class RegisterClinicHistoryService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterClinicHistoryRequest): Promise<RegisterClinicHistorytResponse>{

    try{
      const searchedClinicHistory = await this.unitOfWork.clinicHistoryRepository.findById(request.id);
      if (searchedClinicHistory == undefined) {
        const newClinicHistory: ClinicHistory= new ClinicHistory();
        newClinicHistory.id=request.id;
        newClinicHistory.date=request.date;
        newClinicHistory.professional=request.professional;
        newClinicHistory.anamnesis=request.anamnesis;
        newClinicHistory.bloodPressure=request.bloodPressure;
        newClinicHistory.heartRate=request.heartRate;
        newClinicHistory.respiratoryRate=request.respiratoryRate;
        newClinicHistory.height=request.height;
        newClinicHistory.weight=request.weight;
        newClinicHistory.pulse=request.pulse;
        newClinicHistory.reasonConsultation=request.reasonConsultation;
        var savedClinicHistory = await this.unitOfWork.complete(
          async () => await this.unitOfWork.clinicHistoryRepository.create(newClinicHistory),
        );
        if (savedClinicHistory != undefined ) {
          return new RegisterClinicHistorytResponse(
            'historia clinica registrada satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new RegisterClinicHistorytResponse(
        'Se ha presentado un error al momento de registrar esta historia clinica',
      );
    }

  }
}

export class RegisterClinicHistoryRequest {
  constructor(
    public id: string,
  public date: Date,
  public professional: string,
  public anamnesis: string,
  public bloodPressure: string,
  public heartRate: number,
  public respiratoryRate: number,
  public height: number,
  public weight:number,
  public pulse: number,
  public reasonConsultation: string,
  ) {}
}
export class RegisterClinicHistorytResponse {
  constructor(
    public readonly message: string,

  ) {}
}