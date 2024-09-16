import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}
