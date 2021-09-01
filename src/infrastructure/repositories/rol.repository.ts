import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { GenericRepository } from "../base/generic.repository";
import { Rol } from "../database/auth/rol";

@Injectable()
@EntityRepository(Rol)
export class RolRepository extends GenericRepository<Rol>{}