import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { MessageOphthalmologist, MessagePatient } from "../base/messages.signatures";

export class QueryPatientService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessagePatient>{

    try{
      let searched= await this.unitOfWork.ophthalmologistRepository.find({where: {identification: cedula}});
      if(searched.length>0){
        return <MessagePatient>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessagePatient>{message: 'este paciente no se encuentra registrado.'};
      }
    }catch (e) {
      console.log(e);
      return <MessagePatient>{message: "ocurrió un fallo con la consulta."};

    }

  }
}