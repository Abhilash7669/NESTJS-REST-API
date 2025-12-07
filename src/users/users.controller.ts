import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get() // Get /users or /users?role=ADMIN
  findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    return this.userService.findAll(role);
  }

  @Get(':id') // Get /users/:id
  findOne(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Post() // Post /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'ADMIN' | 'ENGINEER' | 'INTERN';
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':id') // Patch /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'ENGINEER' | 'INTERN';
    },
  ) {
    return this.userService.update(parseInt(id), userUpdate);
  }

  @Delete(':id') // Delete /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
