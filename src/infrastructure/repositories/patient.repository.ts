import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";
import { CustomRepository } from "fireorm";
import { Patient } from "../../domain/entity/patient";



@Injectable()
@CustomRepository(Patient)
export class PatientRepository extends GenericRepository<Patient>{}