import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Patient } from "../../domain/entity/patient";
import { IsDateString, IsInt, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Users } from "../../domain/entity/users";
import * as bcrypt from "bcrypt";
import { ResgisterUsersResponse } from "./register-users.service";
import { ObjectID } from "typeorm";
import { throws } from "assert";
import { ApiProperty } from "@nestjs/swagger";
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
        newPatient.Rol= "PACIENTE";
        const newUser: Users= new Users();
        let identi= String(request.identification);
        newUser.username=identi;
        const salt = await bcrypt.genSalt();
        newUser.password= await bcrypt.hash(identi, salt);
        newUser.rol=newPatient.Rol;
        newUser.name=request.names;
        newUser.surname=request.surnames;
        const savedUsers = await this.unitOfWork.usersRepository.save(newUser);
        let idObjetUser=String(savedUsers._id)
        newPatient.idUser= idObjetUser;
        const savedPatient = await this.unitOfWork.patientRepository.save(newPatient);
        if (savedPatient != undefined ) {
          return new RegisterPatientResponse(
            'paciente registrado satisfactoriamente'
          );

        }
      } 
      throw new Error('el paciente ya se encuentra registrado');
    }catch (e) {
     
      return new RegisterPatientResponse(
        e.message
      );

    }

  }
}



export class RegisterPatientRequest {
  @IsInt()
  @ApiProperty()

  public identification: number;
  @IsString()
  @ApiProperty()
  public names: string;
  @IsString()
  @ApiProperty()
  public surnames: string;
  @IsString()
  @ApiProperty()
  public address: string;
  @IsDateString()
  @ApiProperty()
  public DateofBirth: Date;
  @IsString()
  @ApiProperty()
  public neighborhood: string;
  @IsInt()
  @ApiProperty()
  public phone: number;
@IsInt()
@ApiProperty()
  public cellPhone: number;
  @IsString()
  @ApiProperty()
  public mail: string;
  @IsString()
  @ApiProperty()
  public guardian: string;
  @IsString()
  @ApiProperty()
  public relationship: string;
  @IsInt()
  @ApiProperty()
  public cellPhoneGuardian: number;
  @IsString()
  @ApiProperty()
  public addressGuardian: string;
  @IsString()
  @ApiProperty()
  public agreement: string;
  @IsInt()
  @ApiProperty()
  public licenseNumber: number;
  @IsString()
  @ApiProperty()
  public EPS: string;
  @IsString()
  @ApiProperty()
  public TypeUser: string;


}
export class RegisterPatientResponse {
  constructor(
    public readonly message: string,

  ) {}
}