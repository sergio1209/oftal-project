import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import {  MessageDiary } from "../base/messages.signatures";

export class QueryDiaryService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(cedula: string): Promise<MessageDiary>{

    try{
      let searched= await this.unitOfWork.diaryRepository.find({where: {idPatient: cedula}});
      if(searched.length>0){
        return <MessageDiary>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessageDiary>{message: 'este usuario no tiene ninguna agenda registrada.'};
      }
    }catch (e) {
      console.log(e);
      return <MessageDiary>{message: "ocurrió un fallo con la consulta."};

    }

  }

  async paginate(page: number, key: string) {
    try {
      console.log(page, key);
      const take = 15;
      const keyword = key || '';
      const pages = page || 1;
      const skip = (pages - 1) * take;

      const [ result, total] = await this.unitOfWork.diaryRepository.findAndCount({
        where: {  $or : [
          {  namePatient: new RegExp(`^${keyword}`)     },
          { nameOphtalmologist:  new RegExp(`^${keyword}`) }
        ]},
        skip,
        take
      });
      return {
        count: total,
        data: result
      }

    } catch (error) {
      return <MessageDiary>{message: error};
    }
  }

}