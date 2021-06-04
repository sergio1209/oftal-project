import { RegisterOphthalmologistService } from "./registers/register-ophthalmologist.service";
import { Module } from "@nestjs/common";
import { RegisterClinicHistoryService } from "./registers/register-clinic-history.service";
import { RegisterPatientService } from "./registers/register-patient.service";
import { RegisterPrescriptionService } from "./registers/register-prescription.service";
import { RegisterAppointmentService } from "./registers/register-appointment.service";
import { QueryAppointmentService } from "./querys/query-appointment.service";
import { QueryClinicHistoryService } from "./querys/query-clinic-history.service";
import { QueryDiaryService } from "./querys/query-diary.service";
import { QueryOphthalmologistService } from "./querys/query-ophthalmologist.service";
import { QueryPatientService } from "./querys/query-patient.service";
import { QueryPresciptionService } from "./querys/query-presciption.service";

@Module({
  imports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    QueryAppointmentService,
    QueryClinicHistoryService,
    QueryDiaryService,
    QueryOphthalmologistService,
    QueryPatientService,
    QueryPresciptionService

  ],
  exports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    QueryAppointmentService,
    QueryClinicHistoryService,
    QueryDiaryService,
    QueryOphthalmologistService,
    QueryPatientService,
    QueryPresciptionService
  ]
})
export class ApplicationModule{}