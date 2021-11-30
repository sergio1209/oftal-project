import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Prescription } from "../../domain/entity/prescription";
import { IsDateString, IsInt, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


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
  @ApiProperty() 
  public id: number;
  @IsDateString() 
  @ApiProperty() 
  public date: Date;
  @IsString() 
  @ApiProperty() 
  public professional: string;
  @IsString()
  @ApiProperty() 
  public description: string;
}
export class ResgisterPrescriptionResponse {
  constructor(
    public readonly message: string,

  ) {}
}