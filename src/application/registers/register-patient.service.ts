import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Patient } from "../../domain/entity/patient";
import { IsDate, IsInt, IsNumber, IsPhoneNumber, IsString } from "class-validator";
export class RegisterPatientService{
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: RegisterPatientRequest): Promise<RegisterPatientResponse>{

    try{
      const searchedPatient: Patient = await this.unitOfWork.patientRepository.findOne({where: {identification: request.identification}});
      if (searchedPatient==undefined ) {
        const newPatient: Patient= new Patient();
        newPatient.identification=request.identification;
        newPatient.names=request.names;
        newPatient.surnames=request.surnames;
        newPatient.DateofBirth=request.DateofBirth;
        newPatient.neighborhood=request.neighborhood;
        newPatient.phone=request.phone;
        newPatient.cellPhone=request.cellPhone;
        newPatient.address=request.address;
        newPatient.mail=request.mail;
        newPatient.guardian=request.guardian;
        newPatient.relationship=request.relationship;
        newPatient.cellPhoneGuardian=request.cellPhoneGuardian;
        newPatient.addressGuardian=request.addressGuardian;
        newPatient.agreement=request.agreement;
        newPatient.licenseNumber=request.licenseNumber;
        newPatient.EPS=request.EPS;
        newPatient.TypeUser=request.TypeUser;
        const savedPatient = await this.unitOfWork.patientRepository.save(newPatient);

        if (savedPatient != undefined ) {
          return new RegisterPatientResponse(
            'paciente registrado satisfactoriamente'
          );
        }
      }
    }catch (e) {
      console.log(e);
      return new RegisterPatientResponse(
        'Se ha presentado un error al momento de registrar este paciente',
      );
    }

  }
}



export class RegisterPatientRequest {
  @IsInt()
  public identification: number;
  @IsString()
  public names: string;
  @IsString()
  public surnames: string;
  @IsString()
  public address: string;
  @IsDate()
  public DateofBirth: Date;
  @IsString()
  public neighborhood: string;
  @IsInt()
  public phone: number;
@IsInt()
  public cellPhone: number;
  @IsString()
  public mail: string;
  @IsString()
  public guardian: string;
  @IsString()
  public relationship: string;
  @IsInt()
  public cellPhoneGuardian: number;
  @IsString()
  public addressGuardian: string;
  @IsString()
  public agreement: string;
  @IsInt()
  public licenseNumber: number;
  @IsString()
  public EPS: string;
  @IsString()
  public TypeUser: string;
}
export class RegisterPatientResponse {
  constructor(
    public readonly message: string,

  ) {}
}