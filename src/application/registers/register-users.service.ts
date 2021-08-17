import {  IsString } from "class-validator";
import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Users } from "../../domain/entity/users";
import * as bcrypt from "bcrypt";
import { AuthUsersService } from "../security/auth-users.service";

export class RegisterUsersService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ResgisterUsersRequest): Promise<ResgisterUsersResponse>{

    try{
      const searchedUsers: Users = await this.unitOfWork.usersRepository.findOne({where: {username: request.username}});
      if (searchedUsers == undefined) {
        const newUser: Users= new Users();
        newUser.username=request.username;
        const salt = await bcrypt.genSalt();
        newUser.password= await bcrypt.hash(request.password, salt);
        newUser.rol=request.rol;
        newUser.name=request.name;
        newUser.surname=request.surname;
        const savedUsers = await this.unitOfWork.usersRepository.save(newUser);
        if (savedUsers != undefined ) {
          return new ResgisterUsersResponse(
            'usuario registrado satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new ResgisterUsersResponse(
        'Se ha presentado un error al momento de registrar este usuario',
      );
    }

  }

}

export class ResgisterUsersRequest {

  @IsString()
  username:string;
  @IsString()
  password: string;
  @IsString()
  rol:string;
  @IsString()
  name:string;
  @IsString()
  surname:string;
}
export class ResgisterUsersResponse {
  constructor(
    public readonly message: string,

  ) {}
}