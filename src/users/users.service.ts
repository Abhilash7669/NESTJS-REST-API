import { Injectable } from '@nestjs/common';
import { UserRoles } from 'src/lib/types/users/index.type';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Abhilash',
      email: 'abhilashsk1998@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Aswin',
      email: 'aswin@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Goutham',
      email: 'goutham@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Shek',
      email: 'shek@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Abhinav',
      email: 'abhinav@gmail.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: UserRoles) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.filter((user) => user.id === id);
  }

  create(user: { name: string; email: string; role: UserRoles }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    return newUser;
  }

  update(
    id: number,
    userUpdate: { name?: string; email?: string; role?: UserRoles },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...userUpdate,
        };
      }
      return user;
    });

    const updatedUser = this.findOne(id);
    return updatedUser;
  }

  delete(id: number) {
    const findUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return {
      success: true,
      message: `User: ${findUser[0].name} has been deleted`,
    };
  }
}
