import { IUnitOfWork } from '../../infrastructure/contracts/i.unit.of.work';
import { Ophthalmologist } from '../../domain/entity/ophthalmologist';
import {
  RegisterOphthalmologistRequest,
  RegisterOphthalmologistResponse,
} from '../registers/register-ophthalmologist.service';
import { RegisterPatientResponse } from "../registers/register-patient.service";
import { Patient } from "../../domain/entity/patient";

export class UpdateOphthalmologistService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(
    request: RegisterOphthalmologistRequest,
    idAnterior: number
  ): Promise<RegisterOphthalmologistResponse> {
    try {
      let searchedOphthalmologist: Ophthalmologist = await this.unitOfWork.ophthalmologistRepository.findOne(
        { where: { id: idAnterior } },
      );
      if (!searchedOphthalmologist) {
        return new RegisterOphthalmologistResponse(
          'este oftalmologo no se encuentra registrado',
        );
      }
      let searchedOphthalmologist2: Ophthalmologist = await this.unitOfWork.ophthalmologistRepository.findOne(
        { where: { id: request.id } });
      if (searchedOphthalmologist2){
        return new RegisterOphthalmologistResponse(
          'esta identificación ya pertenece a otro paciente',
        );
      }

      searchedOphthalmologist.id = request.id;
      searchedOphthalmologist.names = request.names;
      searchedOphthalmologist.surnames = request.surnames;
      searchedOphthalmologist.specialty = request.specialty;
      searchedOphthalmologist.gender = request.gender;
      searchedOphthalmologist.phone = request.phone;
      searchedOphthalmologist.cellPhone = request.cellPhone;
      searchedOphthalmologist.address = request.address;
      searchedOphthalmologist.age = request.age;
        const savedOphthalmologist = await this.unitOfWork.ophthalmologistRepository.save(
          searchedOphthalmologist,
        );
        if (savedOphthalmologist != undefined) {
          return new RegisterOphthalmologistResponse(
            'oftalmologo registrado satisfactoriamente',
          );
        }

    } catch (e) {
      console.log(e);
      return new RegisterOphthalmologistResponse(
        'Se ha presentado un error al momento de registrar este oftalmologo',
      );
    }
  }
}
