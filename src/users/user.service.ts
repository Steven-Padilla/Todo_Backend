import { Injectable } from "@nestjs/common";
import { User } from './User.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  saltRounds=process.env.BCRYPT_ROUNDS 
  
  async login(idName: string, password:string) {
    const jwtPassword= process.env.JWT_SECRET
    
    if(!jwtPassword){
      return {
        isLogged:false,
        message: 'Server error at creating token',
        token:{}
      }
    }
    //Getting the user
    const user = await User.findOne({
      where:{idName}
    });
    
    if (!user){
      return {
        isLogged:false,
        message: 'User not found',
        token:{}
      }
    }

    //Comparing passwords
    const isLogged=bcrypt.compareSync(password, user.password,)

    if (isLogged){
      //Generating Token
      const token=jwt.sign({idName:user.idName},jwtPassword,{expiresIn:60*20});
      return {
        isLogged:true,
        message: 'Loggin successful',
        token
      }
    }else{
      //If not valid credentials
      return {
        isLogged:false,
        message: 'Invalid Credentials',
      }
    }

    
    
  }

  
  async createUser(idName: string, password: string) {
    
    if (!this.saltRounds){
      return {
        isCreated:false,
        message: 'Server error at creating hash password',
      }
    }
    const hashPassword=bcrypt.hashSync(password,Number(this.saltRounds));
    const [user,isCreated]=await User.findOrCreate({
      where:{idName},
      defaults:{idName, password:hashPassword}
    })
    return {
      isCreated,
      message: 'User created',
      data:user
    } 
  }
}
