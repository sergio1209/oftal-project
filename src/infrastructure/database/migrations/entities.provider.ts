
import { Ophthalmologist } from "../../../domain/entity/ophthalmologist";
import { OphthalmologistRepository } from "../../repositories/ophthalmologist.repository";

import { PatientRepository } from "../../repositories/patient.repository";
import { Patient } from "../../../domain/entity/patient";
import { ClinicHistoryRepository } from "../../repositories/clinic.history.repository";
import { ClinicHistory } from "../../../domain/entity/clinic-history";
import { Prescription } from "../../../domain/entity/prescription";
import { PresciptionRepository } from "../../repositories/presciption.repository";
import { Diary } from "../../../domain/entity/diary";
import { DiaryRepository } from "../../repositories/diary.repository";
import { Connection } from "typeorm";
import { Appointment } from "../../../domain/entity/appointment";
import { AppointmentRepository } from "../../repositories/appointment.repository";

export const ophthalmologistProviders = [
  {
    provide: 'OPHTHALMOLOGIST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Ophthalmologist) as OphthalmologistRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const patientProviders = [
  {
    provide: 'PATIENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Patient) as PatientRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const clinicHistoryProviders = [
  {
    provide: 'CLINIC_HISTORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(ClinicHistory) as ClinicHistoryRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];
export const PresciptionProviders = [
  {
    provide: 'CLINIC_HISTORY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Prescription) as PresciptionRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];

export const DiaryProviders = [
  {
    provide: 'DIARY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Diary) as DiaryRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];

export const AppointmentProviders = [
  {
    provide: 'Appointment_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Appointment) as AppointmentRepository,
    inject: ['DATABASE_CONNECTION'],
  },
];