import { Ophthalmologist } from "../../domain/entity/ophthalmologist";
import { GenericRepository } from "../base/generic.repository";
import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";

@Injectable()
@EntityRepository(Ophthalmologist)
export class OphthalmologistRepository extends GenericRepository<Ophthalmologist>{}


