import { Injectable } from "@nestjs/common";
import { ToDo } from "src/todo/Todo.entity";

@Injectable()
export class TodoService {
  async getAllTodo(userIdName:string) {
    return await ToDo.findAll({
      where:{userIdName}
    });
  }

  async createTodo(title: string, description: string,userIdName:string) {
    title = title ? title : "Todo title";
    try {
      return await ToDo.create({
        title,
        description,
        userIdName
  
      });
    } catch (error) {
      return null
    }
  }
  async updateTodo(id: number, title: string, description: string) {
    const target = await ToDo.findByPk(id);
    if (target) {
      return await target.update({
        title,
        description,
      });
    }
    return null;
  }
  async deleteTodo(id: number) {
    const target = await ToDo.findByPk(id);
    if (target) {
      await target.destroy()
      return true;
    }
    return false;
  }
}
