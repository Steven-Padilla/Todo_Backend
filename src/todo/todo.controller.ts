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
    const { title, description } = body;
    return this.todoService.createTodo(title, description);
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
  errorNotFound() {
    throw new BadRequestException("Todo not found", {
      cause: new Error(),
      description: "Todo doesn't exist in database",
    });
  }
}
