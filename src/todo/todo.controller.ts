import { TodoService } from "./todo.service";
import { ToDo } from "src/todo/Todo.entity";
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  BadRequestException,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodo() {
    return await this.todoService.getAllTodo();
  }
  @Get("/:id")
  async getByIdTodo(@Param("id") id: number) {
    const response = await this.todoService.getByPkTodo(id);
    if (response) {
      return response;
    }
    this.errorNotFound();
  }
  @Post()
  async createTodo(@Body() body: ToDo) {
    const { title, description,userIdName } = body;
    const data=await this.todoService.createTodo(title, description,userIdName);
    if(data){
      return data; 
    }
    throw new HttpException('Error creating ToDo',HttpStatus.BAD_REQUEST,{cause: new Error ('Foreing key problems')})
  }
  @Put("/:id")
  async updateTodo(@Body() body: ToDo, @Param("id") id: number) {
    const { title, description } = body;
    const response = await this.todoService.updateTodo(id, title, description);
    if (!response) {
      this.errorNotFound();
    }
    return response;
  }
  @Delete("/:id")
  async deleteTodo(@Param("id") id: number) {
    const response = await this.todoService.deleteTodo(id);
    if (!response) {
      this.errorNotFound();
    }
    return response;
  }
  errorNotFound() {
    throw new BadRequestException("Todo not found", {
      cause: new Error(),
      description: "Todo doesn't exist in database",
    });
  }
}
