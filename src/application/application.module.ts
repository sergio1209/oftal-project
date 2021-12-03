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
import { UpdatePatientService } from "./updates/update-patient.service";
import { UpdateAppointmentService } from "./updates/update-appoiment.service";
import { UpdateDiaryService } from "./updates/update-diary.service";
import { UpdateOphthalmologistService } from "./updates/update-ophthalmologist.service";
import { UpdatePrescriptionService } from "./updates/update-prescription.service";
import { UpdateClinicHistoryService } from "./updates/update-clinic-history.service";
import { RegisterUsersService } from "./registers/register-users.service";
import { QueryUsersService } from "./querys/query-users.service";
import { AuthUsersService } from "./security/auth-users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./security/constants";
import { MailerService } from "./mail/mailer.service";

@Module({
  imports: [
    JwtModule.register({secret: jwtConstants.secret}),
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    RegisterUsersService,
    QueryAppointmentService,
    QueryClinicHistoryService,
    QueryDiaryService,
    QueryOphthalmologistService,
    QueryPatientService,
    QueryPresciptionService,
    QueryUsersService,
    UpdatePatientService,
    UpdateAppointmentService,
    UpdateDiaryService,
    UpdateOphthalmologistService,
    UpdatePrescriptionService,
    UpdateClinicHistoryService,
    AuthUsersService


  ],
  exports: [
    RegisterOphthalmologistService,
    RegisterClinicHistoryService,
    RegisterPatientService,
    RegisterPrescriptionService,
    RegisterAppointmentService,
    RegisterUsersService,
    QueryAppointmentService,
    QueryClinicHistoryService,
    QueryDiaryService,
    QueryOphthalmologistService,
    QueryPatientService,
    QueryPresciptionService,
    QueryUsersService,
    UpdatePatientService,
    UpdateAppointmentService,
    UpdateDiaryService,
    UpdateOphthalmologistService,
    UpdatePrescriptionService,
    UpdateClinicHistoryService,
    AuthUsersService,
    MailerService
  ],
providers:[
  MailerService
]
})
export class ApplicationModule{}