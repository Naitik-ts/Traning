import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/models/post.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => [Post])
  posts?: Post[];
}
