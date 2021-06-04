import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { ClinicHistory } from "../../domain/entity/clinic-history";

export class RegisterClinicHistoryService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterClinicHistoryRequest): Promise<RegisterClinicHistorytResponse>{

    try{

      const searchedClinicHistory: ClinicHistory = await this.unitOfWork.clinicHistoryRepository.findOne({where: {idPatient: request.idPatient}});
      if (searchedClinicHistory == undefined) {

        const newClinicHistory: ClinicHistory= new ClinicHistory();
        newClinicHistory.idPatient=request.idPatient;
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
        const savedClinicHistory = await this.unitOfWork.clinicHistoryRepository.save(newClinicHistory);
        if (savedClinicHistory != undefined ) {
          return new RegisterClinicHistorytResponse(
            'historia clinica registrada satisfactoriamente'
          );
        }else {
          return new RegisterClinicHistorytResponse(
            'historia clinica no ha sido registrada satisfactoriamente'
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
    public idPatient: string,
  public date: Date,
  public professional: string,
  public anamnesis: string,
  public bloodPressure: string,
  public heartRate: number,
  public respiratoryRate: number,
  public height: number,
  public weight:number,
  public pulse: number,
  public reasonConsultation: string
  ) {}
}
export class RegisterClinicHistorytResponse {
  constructor(public readonly message: string) {}
}