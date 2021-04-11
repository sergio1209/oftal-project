import { GenericRepository } from "../base/generic.repository";
import { Patient } from "../../domain/entity/patient";
import { Prescription } from "../../domain/entity/prescription";
import { Injectable } from "@nestjs/common";
import { CustomRepository } from "fireorm";

@Injectable()
@CustomRepository(Prescription)
export class PresciptionRepository extends GenericRepository<Prescription>{}