import { RegisterOphthalmologistService } from "./register.ophthalmologist.service";
import { Module } from "@nestjs/common";
import { RegisterClinicHistoryService } from "./register.clinic.history.service";
import { RegisterPatientService } from "./register.patient.service";
import { RegisterPrescriptionService } from "./register.prescription.service";

@Module({
  imports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService

  ],
  exports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService
  ]
})
export class ApplicationModule{}