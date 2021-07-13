import { IUnitOfWork } from '../../infrastructure/contracts/i.unit.of.work';
import { Patient } from '../../domain/entity/patient';
import {
  RegisterPatientRequest,
  RegisterPatientResponse,
} from '../registers/register-patient.service';

export class UpdatePatientService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(
    request: RegisterPatientRequest,
  idAnterior: number ): Promise<RegisterPatientResponse> {
    try {
      let searchedPatient: Patient = await this.unitOfWork.patientRepository.findOne(
        { where: { identification: idAnterior } },
      );
      if (!searchedPatient) {
        return new RegisterPatientResponse(
          'este paciente no se encuentra registrado',
        );
      }
      let searchedPatient2: Patient = await this.unitOfWork.patientRepository.findOne(
        { where: { identification: request.identification } });
      if (searchedPatient2){
        return new RegisterPatientResponse(
          'esta identificación ya pertenece a otro paciente',
        );
      }
      searchedPatient.identification = request.identification;
      searchedPatient.names = request.names;
      searchedPatient.surnames = request.surnames;
      searchedPatient.DateofBirth = request.DateofBirth;
      searchedPatient.neighborhood = request.neighborhood;
      searchedPatient.phone = request.phone;
      searchedPatient.cellPhone = request.cellPhone;
      searchedPatient.address = request.address;
      searchedPatient.mail = request.mail;
      searchedPatient.guardian = request.guardian;
      searchedPatient.relationship = request.relationship;
      searchedPatient.cellPhoneGuardian = request.cellPhoneGuardian;
      searchedPatient.addressGuardian = request.addressGuardian;
      searchedPatient.agreement = request.agreement;
      searchedPatient.licenseNumber = request.licenseNumber;
      searchedPatient.EPS = request.EPS;
      searchedPatient.TypeUser = request.TypeUser;
      const savedPatient = await this.unitOfWork.patientRepository.save(
        searchedPatient,
      );

      if (savedPatient != undefined) {
        return new RegisterPatientResponse(
          'información del paciente actualizada satisfactoriamente',
        );
      }
    } catch (e) {
      console.log(e);
      return new RegisterPatientResponse(
        'Se ha presentado un error al momento de registrar este paciente',
      );
    }
  }
}
