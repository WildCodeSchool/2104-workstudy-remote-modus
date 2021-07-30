import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthRegisterInput {
  @Field()
  email!: string;

  @Field()
  nickname!: string;

  @Field()
  password!: string;
}

@InputType()
export class AuthLoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
