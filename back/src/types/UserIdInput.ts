import { InputType, Field } from 'type-graphql';

@InputType()
export class UserIdInput {
  @Field()
  _id: string;
}
