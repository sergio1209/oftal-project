import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Prescription } from "../../domain/entity/prescription";
import { IsDateString, IsInt, IsString } from "class-validator";
import { IsIdentityCard } from "class-validator";

export class RegisterPrescriptionService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ResgisterPrescriptionRequest): Promise<ResgisterPrescriptionResponse>{

    try{
     const searchedPrescription: Prescription = await this.unitOfWork.presciptionRepository.findOne({where: {id: request.id}});
      if (searchedPrescription == undefined) {
        const newPrescription: Prescription= new Prescription();
        newPrescription.id=request.id;
        newPrescription.date=request.date;
        newPrescription.professional=request.professional;
        newPrescription.description=request.description;
        const savedPrescription = await this.unitOfWork.presciptionRepository.save(newPrescription);
        if (savedPrescription != undefined ) {
          return new ResgisterPrescriptionResponse(
            'prescription registrada satisfactoriamente'
          );
        }
     }
    }catch (e) {
      console.log(e);
      return new ResgisterPrescriptionResponse(
        'Se ha presentado un error al momento de registrar esta prescription',
      );
    }

  }

}
export class ResgisterPrescriptionRequest {
  @IsInt()
  public id: number;
  @IsDateString()
  public date: Date;
  @IsString()
  public professional: string;
  @IsString()
  public description: string;
}
export class ResgisterPrescriptionResponse {
  constructor(
    public readonly message: string,

  ) {}
}