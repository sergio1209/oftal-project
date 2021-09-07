import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { IsString } from "class-validator";


@Entity('Patients')
export class Patient{
  @ObjectIdColumn()
  public _id: ObjectID;
  @Column({unique:true})
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
  @Column()
  public Rol: string ='paciente';
  @Column({select:true})
  public idUser: string;
}