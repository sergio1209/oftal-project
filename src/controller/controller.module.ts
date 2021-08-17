import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { OphthalmologistController } from "./ophthalmologist.controller";
import { ApplicationModule } from "../application/application.module";
import { PatientController } from "./patient.controller";
import { ClinicHistoryController } from "./clinic-history.controller";
import { PresciptionController } from "./presciption.controller";
import { DiaryController } from "./diary.controller";
import { AppointmentController } from "./appointment.controller";
import { UsersController } from "./users.controller";

@Module({
  imports: [
    ApplicationModule,
    InfrastructureModule
  ],
  controllers: [
    OphthalmologistController,
    PatientController,
    ClinicHistoryController,
    PresciptionController,
    DiaryController,
    AppointmentController,
    UsersController

  ]
})
export class ControllersModule{}