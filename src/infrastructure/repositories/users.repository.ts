import { Injectable } from "@nestjs/common";
import { EntityRepository } from "typeorm";
import { GenericRepository } from "../base/generic.repository";
import { Users } from "../../domain/entity/users";

@Injectable()
@EntityRepository(Users)
export class UsersRepository extends GenericRepository<Users>{}