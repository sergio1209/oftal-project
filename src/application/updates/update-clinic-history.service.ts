import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { ClinicHistory } from "../../domain/entity/clinic-history";
import {
  RegisterClinicHistoryRequest,
  RegisterClinicHistorytResponse
} from "../registers/register-clinic-history.service";
import { RegisterPatientResponse } from "../registers/register-patient.service";

export class UpdateClinicHistoryService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterClinicHistoryRequest): Promise<RegisterClinicHistorytResponse>{

    try{

      let searchedClinicHistory: ClinicHistory = await this.unitOfWork.clinicHistoryRepository.findOne({where: {idPatient: request.idPatient}});
      if (!searchedClinicHistory) {
        return new RegisterPatientResponse(
          'esta historia clinica no se encuentra registrada',
        );
      }

      searchedClinicHistory.idPatient=request.idPatient;
      searchedClinicHistory.date=request.date;
      searchedClinicHistory.professional=request.professional;
      searchedClinicHistory.anamnesis=request.anamnesis;
      searchedClinicHistory.bloodPressure=request.bloodPressure;
      searchedClinicHistory.heartRate=request.heartRate;
      searchedClinicHistory.respiratoryRate=request.respiratoryRate;
      searchedClinicHistory.height=request.height;
      searchedClinicHistory.weight=request.weight;
      searchedClinicHistory.pulse=request.pulse;
      searchedClinicHistory.reasonConsultation=request.reasonConsultation;
        const savedClinicHistory = await this.unitOfWork.clinicHistoryRepository.save(searchedClinicHistory);
        if (savedClinicHistory != undefined ) {
          return new RegisterClinicHistorytResponse(
            'historia clinica registrada satisfactoriamente'
          );
        }else {
          return new RegisterClinicHistorytResponse(
            'historia clinica no ha sido registrada satisfactoriamente'
          );
        }

    }catch (e) {
      console.log(e);
      return new RegisterClinicHistorytResponse(
        'Se ha presentado un error al momento de registrar esta historia clinica',
      );
    }

  }
}
