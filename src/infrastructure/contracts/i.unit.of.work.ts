import { OphthalmologistRepository } from "../repositories/ophthalmologist.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { ClinicHistoryRepository } from "../repositories/clinic.history.repository";
import { PresciptionRepository } from "../repositories/presciption.repository";
import { DiaryRepository } from "../repositories/diary.repository";

export interface IUnitOfWork{

  //Repositories
  ophthalmologistRepository: OphthalmologistRepository;
  patientRepository: PatientRepository;
  clinicHistoryRepository: ClinicHistoryRepository;
  presciptionRepository: PresciptionRepository;
  diaryRepository: DiaryRepository;


}