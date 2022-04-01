import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { MessageDiary, MessageOphthalmologist } from "../base/messages.signatures";

export class QueryOphthalmologistService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessageOphthalmologist>{

    try{
      let searched= await this.unitOfWork.ophthalmologistRepository.find({where: {id: cedula}});
      if(searched.length>0){
        return <MessageOphthalmologist>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessageOphthalmologist>{message: 'este oftalmologo no se encuentra registrado.'};
      }
    }catch (e) {
      console.log(e);
      return <MessageOphthalmologist>{message: "ocurrió un fallo con la consulta."};

    }

  }

  async paginate(page: number, key: string) {
    try {
      console.log(page, key);
      const take = 15;
      const keyword = key || '';
      const pages = page || 1;
      const skip = (pages - 1) * take;

      const [ result, total] = await this.unitOfWork.ophthalmologistRepository.findAndCount({
        where: {  $or : [
          {  names: new RegExp(`^${keyword}`)     },
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
      return <MessageOphthalmologist>{message: error};
    }
  }
}