import { IUnitOfWork } from "../infrastructure/contracts/i.unit.of.work";
import { Ophthalmologist } from "../domain/entity/ophthalmologist";

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
       const savedOphthalmologist = await this.unitOfWork.ophthalmologistRepository.save(newOphthalmologist);
        if (savedOphthalmologist != undefined ) {
          return new RegisterOphthalmologistResponse(
            'oftalmologo registrado satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new RegisterOphthalmologistResponse(
        'Se ha presentado un error al momento de registrar este oftalmologo',
      );
    }

  }
}

export class RegisterOphthalmologistRequest{
  constructor(
    public id: string,
  public names: string,
  public surnames: string,
  public specialty: string,
  public gender: string,
  public phone: number,
  public cellPhone:number,
  public address:string,
  public age: string,
  ) {}
}
export class RegisterOphthalmologistResponse{
  constructor(
    public readonly message: string,

  ) {}
}