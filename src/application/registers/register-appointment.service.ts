import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Appointment } from "../../domain/entity/appointment";
import { UnitOfWork } from "../../infrastructure/base/unit.of.work";
import { IsDate, IsInt, IsString } from "class-validator";

export class RegisterAppointmentService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterAppointmentRequest): Promise<RegisterAppointmentResponse>{

    try{
      const searchedAppointment: Appointment = await this.unitOfWork.appointmentRepository.findOne({where: {idPatient: request.idPatient}});
      if (searchedAppointment == undefined) {
        const newAppointment: Appointment= new Appointment();
        newAppointment.idPatient=request.idPatient;
        newAppointment.date=request.date;
        newAppointment.dateAppointment=request.dateAppointment;
        newAppointment.hours=request.hours;
        newAppointment.performAppointment=request.performAppointment;
        newAppointment.duration=request.duration;
        newAppointment.status=request.status;


        const savedAppointment = await this.unitOfWork.appointmentRepository.save(newAppointment);
        if (savedAppointment != undefined ) {
          return new RegisterAppointmentResponse(
            'cita registrada satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new RegisterAppointmentResponse(
        'Se ha presentado un error al momento de registrar esta cita',
      );
    }

  }
}

export class RegisterAppointmentRequest {
 @IsInt()
    public idPatient: number;
 @IsDate()
  public dateAppointment: Date;
 @IsDate()
  public date: Date;
 @IsString()
  public hours: string;
  @IsString()
  public performAppointment: string;
  @IsString()
  public duration: string;
  @IsString()
  public status: string;

}
export class RegisterAppointmentResponse {
  constructor(public readonly message: string) {}
}