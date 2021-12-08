import { InputType, Field } from 'type-graphql';
@InputType()
export class UpdateUserProfileInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}