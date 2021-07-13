import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Appointment } from "../../domain/entity/appointment";
import { RegisterAppointmentRequest, RegisterAppointmentResponse } from "../registers/register-appointment.service";
import { Patient } from "../../domain/entity/patient";
import { RegisterPatientResponse } from "../registers/register-patient.service";


export class UpdateAppointmentService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterAppointmentRequest): Promise<RegisterAppointmentResponse>{

    try{
      let searchedAppointment: Appointment = await this.unitOfWork.appointmentRepository.findOne(
        { where: { idPatient: request.idPatient } },
      );
      if (!searchedAppointment) {
        return new RegisterAppointmentResponse(
          'este paciente no se encuentra registrado',
        );
      }

      searchedAppointment.date=request.date;
      searchedAppointment.dateAppointment=request.dateAppointment;
      searchedAppointment.hours=request.hours;
      searchedAppointment.performAppointment=request.performAppointment;
      searchedAppointment.duration=request.duration;
      searchedAppointment.status=request.status;


        const savedAppointment = await this.unitOfWork.appointmentRepository.save(searchedAppointment);
        if (savedAppointment != undefined ) {
          return new RegisterAppointmentResponse(
            'cita actualizada satisfactoriamente'
          );
        }

    }catch (e) {
      console.log(e);
      return new RegisterAppointmentResponse(
        'Se ha presentado un error al momento de registrar esta cita',
      );
    }

  }
}
