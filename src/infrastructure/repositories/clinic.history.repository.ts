import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";
import { ClinicHistory } from "../../domain/entity/clinic-history";
import { EntityRepository } from "typeorm";

@Injectable()
@EntityRepository(ClinicHistory)
export class ClinicHistoryRepository extends GenericRepository<ClinicHistory>{}
