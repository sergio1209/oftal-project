import { IUnitOfWork } from "../../infrastructure/contracts/i.unit.of.work";
import { Prescription } from "../../domain/entity/prescription";
import {
  ResgisterPrescriptionRequest,
  ResgisterPrescriptionResponse
} from "../registers/register-prescription.service";
import { RegisterPatientResponse } from "../registers/register-patient.service";

export class UpdatePrescriptionService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(request: ResgisterPrescriptionRequest): Promise<ResgisterPrescriptionResponse>{

    try{
      let searchedPrescription: Prescription = await this.unitOfWork.presciptionRepository.findOne({where: {id: request.id}});
      if (!searchedPrescription) {
        return new RegisterPatientResponse(
          'esta prescripcion no se encuentra registrada',
        );
      }
      searchedPrescription.date=request.date;
      searchedPrescription.professional=request.professional;
      searchedPrescription.description=request.description;
        const savedPrescription = await this.unitOfWork.presciptionRepository.save(searchedPrescription);
        if (savedPrescription != undefined ) {
          return new ResgisterPrescriptionResponse(
            'prescripcion registrada satisfactoriamente'
          );
        }

    }catch (e) {
      console.log(e);
      return new ResgisterPrescriptionResponse(
        'Se ha presentado un error al momento de registrar esta prescripcion',
      );
    }

  }

}