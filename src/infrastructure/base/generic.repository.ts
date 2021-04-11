import { Inject, Injectable } from "@nestjs/common";
import { BaseFirestoreRepository, IEntity } from "fireorm";
import * as Admin from 'firebase-admin';
@Injectable()
export abstract class GenericRepository<T extends IEntity> {
  public firebase: any;
  constructor(@Inject('DATABASE_CONNECTION') public readonly admin: Admin) {
    this.firebase=admin;
  }
  public create(entity: T) {
    firebase.database().ref('users/' + entity.id).set(JSON.stringify(entity));

  }

}