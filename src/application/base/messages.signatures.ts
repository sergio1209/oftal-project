import { MessageGenericInterface } from "./message-generic.interface";
import { Appointment } from "../../domain/entity/appointment";
import { ClinicHistory } from "../../domain/entity/clinic-history";
import { Diary } from "../../domain/entity/diary";
import { Ophthalmologist } from "../../domain/entity/ophthalmologist";
import { Patient } from "../../domain/entity/patient";
import { Prescription } from "../../domain/entity/prescription";

export class MessageAppoiment implements MessageGenericInterface<Appointment>{}

export class MessageClinicHistory implements MessageGenericInterface<ClinicHistory>{}

export class MessageDiary implements MessageGenericInterface<Diary>{}

export class MessageOphthalmologist implements MessageGenericInterface<Ophthalmologist>{}

export class MessagePatient implements MessageGenericInterface<Patient>{}

export class MessagePrescription implements MessageGenericInterface<Prescription>{}