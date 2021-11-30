
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('Prescriptions')
export class Prescription{
  @ObjectIdColumn() 
  public _id: ObjectID;
  @Column()
  public id: number;
  @Column() 
  public date: Date;
  @Column() 
  public professional: string;
  @Column() 
  public description: string;
}