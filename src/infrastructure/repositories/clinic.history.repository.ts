import { Injectable } from "@nestjs/common";
import { CustomRepository } from "fireorm";
import { GenericRepository } from "../base/generic.repository";
import { ClinicHistory } from "../../domain/entity/clinic.history";

@Injectable()
@CustomRepository(ClinicHistory)
export class ClinicHistoryRepository extends GenericRepository<ClinicHistory>{}
