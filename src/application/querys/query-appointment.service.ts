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

  async paginate(page: number, key: string) {
    try {
      console.log(page, key);
      const take = 15;
      const keyword = key || '';
      const pages = page || 1;
      const skip = (pages - 1) * take;

      const [ result, total] = await this.unitOfWork.appointmentRepository.findAndCount({
        where: {  $or : [
          {  performAppointment: new RegExp(`^${keyword}`)     },
         // { nameOphtalmologist:  new RegExp(`^${keyword}`) }
        ]},
        skip,
        take
      });
      return {
        count: total,
        data: result
      }

    } catch (error) {
      return <MessageAppoiment>{message: error};
    }
  }
}



