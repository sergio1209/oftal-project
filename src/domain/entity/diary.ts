import { Collection } from "fireorm";

@Collection('Diarys')
export class Diary{
  public id: string;
  public namePatient:string;
  public nameOphtalmologist:string;
  public status: string;
  public clinicalOrder:string;
}