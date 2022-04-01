import { Like } from "typeorm";
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

  async paginate(page: number, key: string) {
    try {
      console.log(page, key);
      const take = 15;
      const keyword = key || '';
      const pages = page || 1;
      const skip = (pages - 1) * take;

      const [ result, total] = await this.unitOfWork.patientRepository.findAndCount({
        where: {  $or : [
          { names: new RegExp(`^${keyword}`)     },
          { surnames:  new RegExp(`^${keyword}`) }
        ]},
        skip,
        take
      });
      return {
        count: total,
        data: result
      }

    } catch (error) {
      return <MessagePatient>{message: error};
    }
  }
}