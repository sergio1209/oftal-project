import {  Injectable } from '@nestjs/common';
import { MongoRepository } from "typeorm";
@Injectable()
export abstract class GenericRepository<T> extends MongoRepository<T>{}