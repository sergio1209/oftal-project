import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { MessageClinicHistory, MessageDiary } from "../base/messages.signatures";

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
}