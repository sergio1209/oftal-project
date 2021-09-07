import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Ophthalmologist } from "../../domain/entity/ophthalmologist";
import { IsInt, IsString } from "class-validator";
import { Users } from "../../domain/entity/users";
import * as bcrypt from "bcrypt";

export class RegisterOphthalmologistService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterOphthalmologistRequest): Promise<RegisterOphthalmologistResponse>{

    try{
      const searchedOphthalmologist: Ophthalmologist = await this.unitOfWork.ophthalmologistRepository.findOne({where: {id: request.id}});
     if (searchedOphthalmologist == undefined) {
        const newOphthalmologist: Ophthalmologist= new Ophthalmologist();
        newOphthalmologist.id=request.id;
        newOphthalmologist.names=request.names;
        newOphthalmologist.surnames=request.surnames;
        newOphthalmologist.specialty=request.specialty;
        newOphthalmologist.gender=request.gender;
        newOphthalmologist.phone=request.phone;
        newOphthalmologist.cellPhone=request.cellPhone;
        newOphthalmologist.address=request.address;
        newOphthalmologist.age=request.age;
        newOphthalmologist.Rol="DOCTOR";
       const newUser: Users= new Users();
       let identi= String(request.id);
       newUser.username=identi;
       const salt = await bcrypt.genSalt();
       newUser.password= await bcrypt.hash(identi, salt);
       newUser.rol=newOphthalmologist.Rol;
       newUser.name=request.names;
       newUser.surname=request.surnames;
       const savedUsers = await this.unitOfWork.usersRepository.save(newUser);
       newOphthalmologist.idUser= String(savedUsers._id);
       const savedOphthalmologist = await this.unitOfWork.ophthalmologistRepository.save(newOphthalmologist);
        if (savedOphthalmologist != undefined ) {
          return new RegisterOphthalmologistResponse(
            'oftalmologo registrado satisfactoriamente'
          );
        }
      }
      throw new Error('el Doctor ya se encuentra registrado');
    }catch (e) {
     
      return new RegisterOphthalmologistResponse(
        'el Doctor ya se encuentra registrado',
      );
    }

  }
}

export class RegisterOphthalmologistRequest{
  @IsInt()
  public id: number;
  @IsString()
  public names: string;
  @IsString()
  public surnames: string;
  @IsString()
  public specialty: string;
  @IsString()
  public gender: string;
  @IsInt()
  public phone: number;
  @IsInt()
  public cellPhone:number;
  @IsString()
  public address:string;
  @IsString()
  public age: string;
 
 
}
export class RegisterOphthalmologistResponse{
  constructor(
    public readonly message: string,

  ) {}
}