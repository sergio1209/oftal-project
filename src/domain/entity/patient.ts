import { Collection } from "fireorm";

@Collection('Patients')
export class Patient{
  public id: string;
  public names: string;
  public surnames: string;
  public address: string;
  public DateofBirth: Date;
  public neighborhood: string;
  public phone: number;
  public cellPhone: number;
  public mail: string;
  public guardian: string;
  public relationship: string;
  public cellPhoneGuardian: number;
  public addressGuardian: string;
  public agreement: string;
  public licenseNumber: number;
  public EPS: string;
  public TypeUser: string;
}