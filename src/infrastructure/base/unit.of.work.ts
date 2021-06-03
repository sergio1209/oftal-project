import { IUnitOfWork } from "../contracts/i.unit.of.work";
import { Inject } from "@nestjs/common";
import { OphthalmologistRepository } from "../repositories/ophthalmologist.repository";
import { PatientRepository } from "../repositories/patient.repository";
import { ClinicHistoryRepository } from "../repositories/clinic.history.repository";
import { PresciptionRepository } from "../repositories/presciption.repository";
import { DiaryRepository } from "../repositories/diary.repository";
import { Connection } from "typeorm";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class UnitOfWork implements IUnitOfWork{
  public ophthalmologistRepository: OphthalmologistRepository;
  public patientRepository: PatientRepository;
  public clinicHistoryRepository: ClinicHistoryRepository;
  public  presciptionRepository: PresciptionRepository;
  public diaryRepository: DiaryRepository;
  public appointmentRepository: AppointmentRepository;
  constructor(@Inject('DATABASE_CONNECTION') private readonly asyncDatabaseConnection: Connection ) {
    this.ophthalmologistRepository = this.asyncDatabaseConnection.getCustomRepository(OphthalmologistRepository);
    this.patientRepository = this.asyncDatabaseConnection.getCustomRepository(PatientRepository);
    this.clinicHistoryRepository = this.asyncDatabaseConnection.getCustomRepository(ClinicHistoryRepository);
    this.presciptionRepository = this.asyncDatabaseConnection.getCustomRepository(PresciptionRepository);
    this.diaryRepository = this.asyncDatabaseConnection.getCustomRepository(DiaryRepository);
    this.appointmentRepository= this.asyncDatabaseConnection.getCustomRepository(AppointmentRepository);
  }
}