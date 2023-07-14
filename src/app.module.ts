import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [TodoModule,UserModule,ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
