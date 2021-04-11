import { Collection } from "fireorm";

@Collection('Clinic_Historys')
export class ClinicHistory{
  public id: string;
  public date: Date;
  public professional: string;
  public anamnesis: string;
  public bloodPressure: string;
  public heartRate: number;
  public respiratoryRate: number;
  public height: number;
  public weight:number;
  public pulse: number;
  public reasonConsultation: string;
}