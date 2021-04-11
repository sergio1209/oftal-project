import { Collection } from "fireorm";

@Collection('Ophthalmologists')
export class Ophthalmologist{
  public id: string;
  public names: string;
  public surnames: string;
  public specialty: string;
  public gender: string;
  public phone: number;
  public cellPhone:number;
  public address:string;
  public age: string;

}