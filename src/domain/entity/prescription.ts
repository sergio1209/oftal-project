import { Collection } from "fireorm";

// @ts-ignore
@Collection('Prescriptions')
export class Prescription{
  public id: string;
  public date: Date;
  public professional: string;
  public description: string;
}