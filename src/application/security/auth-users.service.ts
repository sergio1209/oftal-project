import { JwtService } from "@nestjs/jwt";
import { IUnitOfWork } from "src/infrastructure/contracts/i.unit.of.work";
import { jwtConstants } from "./constants";
import * as bcrypt from "bcrypt";
export class AuthUsersService{
  constructor(
    private Iunitofwork: IUnitOfWork 
    
  ) {

  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.Iunitofwork.usersRepository.findOne({where: {name: username}});
    if (user && bcrypt.compareSync(pass,user.password)) {

      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    console.log(user);
    
    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = { username: user.username, rol: user.rol , idUSer: user._id};
    let jwtService= new JwtService({secret:jwtConstants.secret});
   let token= jwtService.sign(payload);
    return {
      infoUser:  await this.InfoUserToken(token),
      access_token: token,
      name: user.name, surname:user.surname
    };
  }
async verifyToken(token:string){
  let jwtService= new JwtService({secret:jwtConstants.secret});
  var decoded = jwtService.verify(token,{secret:jwtConstants.secret});
  if(decoded){
    let rol= await this.Iunitofwork.usersRepository.findOne({where:{username:decoded.username}})
   if(rol.rol==decoded.rol){
     return true;

   }
  }
  return false;
}

async InfoUserToken(token: string){
    try {
      let jwtService= new JwtService({secret:jwtConstants.secret});
      var decoded = jwtService.verify(token,{secret:jwtConstants.secret});
      if (decoded && decoded.rol){
      return this.decodeRolToRepo(decoded.rol, decoded.idUSer);
      }else{
        return null;
      }
    }catch (e){

    }

}
private decodeRolToRepo(rol: string, id: string){
 if(rol=="PACIENTE"){
   return this.Iunitofwork.patientRepository.findOne({select:['identification','names','surnames','address','DateofBirth','neighborhood','phone','cellPhone','mail','guardian','relationship','cellPhoneGuardian','agreement','licenseNumber','EPS','TypeUser'],where:{idUser:id}})
 }else if(rol=="DOCTOR"){
   return this.Iunitofwork.ophthalmologistRepository.findOne({select:['id','names','surnames','specialty','gender','phone','cellPhone','address','age'],where:{idUser:id}})
 }
}
}