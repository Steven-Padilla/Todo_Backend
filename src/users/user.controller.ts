import { UserService } from "./user.service";
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpException,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { User } from "./User.entity";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() body: User) {
    const { idName, password } = body;

    const user=await this.userService.createUser(idName, password);
    if (user.data){
      //If user was created
      return user

    }else{
      //If user was not created
      throw new HttpException(user,HttpStatus.BAD_REQUEST)
    }
  }
  
  @Post('/login')
  @HttpCode(200)
  @ApiResponse({status:200,description:"Loggin successfull",type:String})
  @ApiResponse({status:401,description:"Loggin Bad Request"})
  async login(@Body() body: User) {
    const { idName, password } = body;
    const data= await this.userService.login(idName, password);
    
    if (data.isLogged){
      //If loggin is ok
      return data
    }else {
      //If loggin fail
      throw new HttpException(data,HttpStatus.BAD_REQUEST)
    }
  }
}

