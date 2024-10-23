import { AddUserUseCase } from '@/usecases/user/add-user-usecase';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly addUserUseCase: AddUserUseCase) {}

  @Post()
  async create(@Body() dto: any) {
    return await this.addUserUseCase.create(dto);
  }
}
