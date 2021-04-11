import { databaseProviders } from "./provider/database.provider";
import {
  clinicHistoryProviders, DiaryProviders,
  ophthalmologistProviders,
  patientProviders,
  PresciptionProviders
} from "./migrations/entities.provider";
import { Module } from "@nestjs/common";
import { PatientRepository } from "../repositories/patient.repository";

@Module(
  {
    providers: [
      ...databaseProviders,
      ...ophthalmologistProviders,
      ...patientProviders,
      ...clinicHistoryProviders,
      ...PresciptionProviders,
      ...DiaryProviders
    ],
    exports: [
      ...databaseProviders,
      ...ophthalmologistProviders,
      ...patientProviders,
      ...clinicHistoryProviders,
      ...PresciptionProviders,
      ...DiaryProviders
    ]
  }
)
export class DatabaseModule{}