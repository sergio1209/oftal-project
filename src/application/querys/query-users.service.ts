import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import {  MessageUsers } from "../base/messages.signatures";

export class QueryUsersService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(username: string): Promise<MessageUsers>{

    try{
      let searched= await this.unitOfWork.usersRepository.find({where: {username: username}});
      if(searched.length>0){
        return <MessageUsers>{message: ` se encontraron ${searched.length} cantidad de coincidencias.`,all: searched};
      }else{
        return <MessageUsers>{message: 'este usuario no está registrado.'};
      }
    }catch (e) {
      console.log(e);
      return <MessageUsers>{message: "ocurrió un fallo con la consulta."};

    }

  }
}
