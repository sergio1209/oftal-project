import { GenericRepository } from "../base/generic.repository";
import { Prescription } from "../../domain/entity/prescription";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";

@Injectable()
@EntityRepository(Prescription)
export class PresciptionRepository extends GenericRepository<Prescription>{}