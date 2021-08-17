import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { IsDate, IsNumber, IsString } from "class-validator";

@Entity('Clinic_Historys')
export class ClinicHistory {
  @ObjectIdColumn()
  public _id: ObjectID;
   @Column()
  public idPatient: number;
  @Column()
  public date: Date;
  @Column()
  public professional: string;
  @Column()
  public anamnesis: string;
  @Column()
  public bloodPressure: string;
  @Column()
  public heartRate: number;
  @Column()
  public respiratoryRate: number;
  @Column()
  public height: number;
  @Column()
  public weight:number;
  @Column()
  public pulse: number;
  @Column()
  public reasonConsultation: string;
}