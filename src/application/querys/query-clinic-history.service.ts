import { MessageClinicHistory } from "../base/messages.signatures";
import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";

export class QueryClinicHistoryService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessageClinicHistory>{

    try{
      let searched= await this.unitOfWork.clinicHistoryRepository.find({where: {idPatient: cedula}});
      if(searched.length>0){
        return <MessageClinicHistory>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessageClinicHistory>{message: 'este usuario no tiene ningún historial clínico registrado.'};
      }
    }catch (e) {
      console.log(e);
      return <MessageClinicHistory>{message: "ocurrió un fallo con la consulta."};

    }

  }
}