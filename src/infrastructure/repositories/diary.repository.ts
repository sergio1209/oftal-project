import { Injectable } from "@nestjs/common";
import { GenericRepository } from "../base/generic.repository";
import { Diary } from "../../domain/entity/diary";
import { EntityRepository } from "typeorm";

@Injectable()
@EntityRepository(Diary)
export class DiaryRepository extends GenericRepository<Diary>{}