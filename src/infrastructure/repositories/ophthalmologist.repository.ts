import { Ophthalmologist } from "../../domain/entity/ophthalmologist";
import { GenericRepository } from "../base/generic.repository";
import { Injectable } from "@nestjs/common";
import { CustomRepository } from "fireorm";

@Injectable()
@CustomRepository(Ophthalmologist)
export class OphthalmologistRepository extends GenericRepository<Ophthalmologist>{}


