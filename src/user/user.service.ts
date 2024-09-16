import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { UserInput } from './models/user.dto';

@Injectable()
export class UserService {
  findAll(): User[] {
    return [
      {
        id: 1,
        firstName: 'a',
        lastName: 'b',
        posts: [
          {
            id: 1,
            content: 'XYZ',
          },
          {
            id: 1,
            content: 'XYZ',
          },
        ],
      },
      {
        id: 2,
        firstName: 'c',
        lastName: 'd',
        posts: [],
      },
      {
        id: 2,
        firstName: 'e',
        lastName: 'f',
        posts: [],
      },
    ];
  }
  getUserById(id: number) {
    return {
      id,
      firstName: 'a',
      lastName: 'b',
    };
  }
  createUser(user: UserInput): User {
    return {
      id: 1,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
