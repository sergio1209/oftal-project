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
    const user = await this.Iunitofwork.usersRepository.findOne({where: {username:username}});
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
    const payload = { username: user.username, rol: user.rol };
    let jwtService= new JwtService({secret:jwtConstants.secret});
    return {
    
      access_token: jwtService.sign(payload),
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


}