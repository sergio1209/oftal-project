import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";


@Entity('Patients')
export class Patient{
  @ObjectIdColumn()
  public _id: ObjectID;
  @Column()
  public identification: number;
  @Column()
  public names: string;
  @Column()
  public surnames: string;
  @Column()
  public address: string;
  @Column()
  public DateofBirth: Date;
  @Column()
  public neighborhood: string;
  @Column()
  public phone: number;
  @Column()
  public cellPhone: number;
  @Column()
  public mail: string;
  @Column()
  public guardian: string;
  @Column()
  public relationship: string;
  @Column()
  public cellPhoneGuardian: number;
  @Column()
  public addressGuardian: string;
  @Column()
  public agreement: string;
  @Column()
  public licenseNumber: number;
  @Column()
  public EPS: string;
  @Column()
  public TypeUser: string;
}