import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";
import { Patient } from "../../domain/entity/patient";
import { EntityRepository } from "typeorm";

@Injectable()
@EntityRepository(Patient)
export class PatientRepository extends GenericRepository<Patient>{



}