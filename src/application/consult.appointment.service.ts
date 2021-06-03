import { IUnitOfWork } from "../infrastructure/contracts/i.unit.of.work";
import { Appointment } from "../domain/entity/appointment";

export class QueryAppointmentService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<Appointment[]>{

    try{
      return await this.unitOfWork.appointmentRepository.find({where: {idPatient: cedula}});

    }catch (e) {
      console.log(e);
      return [];

    }

  }
}

export class QueryAppointmentRequest {
  constructor(
    public idPatient: string,
    public dateAppointment: Date,
    public date: Date,
    public hours: string,
    public performAppointment: string,
    public duration: string,
    public status: string,
  ) {}
}
