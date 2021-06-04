import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { MessagePatient, MessagePrescription } from "../base/messages.signatures";

export class QueryPresciptionService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessagePrescription>{

    try{
      let searched= await this.unitOfWork.ophthalmologistRepository.find({where: {identification: cedula}});
      if(searched.length>0){
        return <MessagePrescription>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessagePrescription>{message: 'esta prescripcion no se encuentra registrada.'};
      }
    }catch (e) {
      console.log(e);
      return <MessagePrescription>{message: "ocurrió un fallo con la consulta."};

    }

  }
}