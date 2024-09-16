import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserInput } from './models/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  listUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('user') userInput: UserInput) {
    return this.userService.createUser(userInput);
  }
}
