import { databaseProviders } from "./provider/database.provider";
import {
  AppointmentProviders,
  clinicHistoryProviders, DiaryProviders,
  ophthalmologistProviders,
  patientProviders,
  PresciptionProviders
} from "./migrations/entities.provider";
import { Module } from "@nestjs/common";

@Module(
  {
    providers: [
      ...databaseProviders,
      ...ophthalmologistProviders,
      ...patientProviders,
      ...clinicHistoryProviders,
      ...PresciptionProviders,
      ...DiaryProviders,
      ...AppointmentProviders
    ],
    exports: [
      ...databaseProviders,
      ...ophthalmologistProviders,
      ...patientProviders,
      ...clinicHistoryProviders,
      ...PresciptionProviders,
      ...DiaryProviders,
      ...AppointmentProviders
    ]
  }
)
export class DatabaseModule{}