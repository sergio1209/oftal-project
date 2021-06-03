import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { GenericRepository } from "../base/generic.repository";
import { Appointment } from "../../domain/entity/appointment";

@Injectable()
@EntityRepository(Appointment)
export class AppointmentRepository extends GenericRepository<Appointment>{


}