import { databaseProviders } from "./provider/database.provider";
import {
  AppointmentProviders,
  clinicHistoryProviders, DiaryProviders,
  ophthalmologistProviders,
  patientProviders,
  PresciptionProviders, RolProviders, UsersProviders
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
      ...AppointmentProviders,
      ...UsersProviders,
      ...RolProviders
    ],
    exports: [
      ...databaseProviders,
      ...ophthalmologistProviders,
      ...patientProviders,
      ...clinicHistoryProviders,
      ...PresciptionProviders,
      ...DiaryProviders,
      ...AppointmentProviders,
      ...UsersProviders,
      ...RolProviders
    ]
  }
)
export class DatabaseModule{}