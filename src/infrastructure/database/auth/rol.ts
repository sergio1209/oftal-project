import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('rol')
export class Rol{

@ObjectIdColumn()
public  _id: ObjectID;
@Column()
public nameRol: string;


}