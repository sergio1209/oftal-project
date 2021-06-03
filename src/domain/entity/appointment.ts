import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
@Entity('Appointment')
export class Appointment{
  @ObjectIdColumn()
  public _id: ObjectID;
  @Column()
  public idPatient: string;
  @Column()
  public dateAppointment: Date;
  @Column()
  public date: Date;
  @Column()
  public hours: string;
  @Column()
  public performAppointment: string;
  @Column()
  public duration: string;
  @Column()
  public status: string;
}

/*function JSClock() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  let temp = '' + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
    temp = '12';
  temp += ((minute < 10) ? ':0' : ':') + minute;
  temp += ((second < 10) ? ':0' : ':') + second;
  temp += (hour >= 12) ? ' P.M.' : ' A.M.';
  return temp;
}*/