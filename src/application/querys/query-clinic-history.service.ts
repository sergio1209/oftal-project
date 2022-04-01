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


  async paginate(page: number, key: string) {
    try {
      console.log(page, key);
      const take = 15;
      const keyword = key || '';
      const pages = page || 1;
      const skip = (pages - 1) * take;

      const [ result, total] = await this.unitOfWork.clinicHistoryRepository.findAndCount({
        where: {  $or : [
          {  professional: new RegExp(`^${keyword}`)     }
          //{ surnames:  new RegExp(`^${keyword}`) }
        ]},
        skip,
        take
      });
      return {
        count: total,
        data: result
      }

    } catch (error) {
      return <MessageClinicHistory>{message: error};
    }
  }

}