import { RegisterOphthalmologistService } from "./register.ophthalmologist.service";
import { Module } from "@nestjs/common";
import { RegisterClinicHistoryService } from "./register.clinic.history.service";
import { RegisterPatientService } from "./register.patient.service";
import { RegisterPrescriptionService } from "./register.prescription.service";
import { RegisterAppointmentService } from "./register.appointment.service";
import { QueryAppointmentService } from "./consult.appointment.service";

@Module({
  imports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    QueryAppointmentService

  ],
  exports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    QueryAppointmentService
  ]
})
export class ApplicationModule{}