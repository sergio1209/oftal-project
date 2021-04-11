import { Injectable } from "@nestjs/common";
import { CustomRepository } from "fireorm";
import { GenericRepository } from "../base/generic.repository";
import { Diary } from "../../domain/entity/diary";


@Injectable()
@CustomRepository(Diary)
export class DiaryRepository extends GenericRepository<Diary>{}