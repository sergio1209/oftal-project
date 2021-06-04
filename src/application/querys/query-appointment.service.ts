import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Appointment } from "../../domain/entity/appointment";
import { MessageAppoiment } from "../base/messages.signatures";

export class QueryAppointmentService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessageAppoiment>{

    try{
     let searched= await this.unitOfWork.appointmentRepository.find({where: {idPatient: cedula}});
     if(searched.length>0){
       return <MessageAppoiment>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
     }else{
       return <MessageAppoiment>{message: 'este usuario no tiene ninguna cita médica registrada.'};
     }
    }catch (e) {
      console.log(e);
      return <MessageAppoiment>{message: "ocurrió un fallo con la consulta."};

    }

  }
}



