import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { MessagePatient } from "../base/messages.signatures";

export class QueryPatientService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessagePatient>{

    try{

      let searched= await this.unitOfWork.patientRepository.find({ where: {identification: cedula} });
      if(searched){
        return <MessagePatient>{message: ` se encontraron cantidad de coincidencias.`,all: searched};

      }else{
        return <MessagePatient>{message: 'este paciente no se encuentra registrado.'};
      }
    }catch (e) {
      console.log(e);
      return <MessagePatient>{message: "ocurrió un fallo con la consulta."};

    }

  }
}