import { IUnitOfWork } from "../contracts/i.unit.of.work";
import { Inject } from "@nestjs/common";
import { OphthalmologistRepository } from "../repositories/ophthalmologist.repository";
import { getRepository, runTransaction } from "fireorm";
import { Ophthalmologist } from "../../domain/entity/ophthalmologist";
import { PatientRepository } from "../repositories/patient.repository";
import { Patient } from "../../domain/entity/patient";
import { ClinicHistoryRepository } from "../repositories/clinic.history.repository";
import { ClinicHistory } from "../../domain/entity/clinic.history";
import { PresciptionRepository } from "../repositories/presciption.repository";
import { Prescription } from "../../domain/entity/prescription";
import { DiaryRepository } from "../repositories/diary.repository";
import { Diary } from "../../domain/entity/diary";

export class UnitOfWork implements IUnitOfWork{
  public ophthalmologistRepository: OphthalmologistRepository;
  public patientRepository: PatientRepository;
  public clinicHistoryRepository: ClinicHistoryRepository;
  public  presciptionRepository: PresciptionRepository;
  public diaryRepository: DiaryRepository;
  constructor(@Inject('DATABASE_CONNECTION') public readonly firestore: any) {
    this.ophthalmologistRepository = getRepository(Ophthalmologist) as OphthalmologistRepository;
    this.patientRepository=getRepository(Patient) as PatientRepository;
    this.clinicHistoryRepository=getRepository(ClinicHistory) as ClinicHistoryRepository;
    this.presciptionRepository=getRepository(Prescription) as PresciptionRepository;
    this.diaryRepository=getRepository(Diary) as DiaryRepository;

  }
  async complete(work: () => any): Promise<any> {
    try {
      return await runTransaction(async () => await work());
    } catch (error) {
      return error.toString();
    }
  }
}