import { getRepository } from "fireorm";
import { Ophthalmologist } from "../../../domain/entity/ophthalmologist";
import { OphthalmologistRepository } from "../../repositories/ophthalmologist.repository";

import { PatientRepository } from "../../repositories/patient.repository";
import { Patient } from "../../../domain/entity/patient";
import { ClinicHistoryRepository } from "../../repositories/clinic.history.repository";
import { ClinicHistory } from "../../../domain/entity/clinic.history";
import { Prescription } from "../../../domain/entity/prescription";
import { PresciptionRepository } from "../../repositories/presciption.repository";
import { Diary } from "../../../domain/entity/diary";
import { DiaryRepository } from "../../repositories/diary.repository";

export const ophthalmologistProviders = [
  {
    provide: 'OPHTHALMOLOGIST_REPOSITORY',
    useFactory: () => getRepository(Ophthalmologist) as OphthalmologistRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY',
    useFactory: () => getRepository(Patient) as PatientRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const clinicHistoryProviders = [
  {
    provide: 'CLINIC_HISTORY_REPOSITORY',
    useFactory: () => getRepository(ClinicHistory) as ClinicHistoryRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const PresciptionProviders = [
  {
    provide: 'CLINIC_HISTORY_REPOSITORY',
    useFactory: () => getRepository(Prescription) as PresciptionRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];

export const DiaryProviders = [
  {
    provide: 'DIARY_REPOSITORY',
    useFactory: () => getRepository(Diary) as DiaryRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];