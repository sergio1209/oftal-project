import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
@Entity('users')
export class Users{
  @ObjectIdColumn()
  public _id: ObjectID;
  @Column()
  username:string;
  @Column()
  password: string;
  @Column()
  rol:string;
  @Column()
  name:string;
  @Column()
  surname:string;
}