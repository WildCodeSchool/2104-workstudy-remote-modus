import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';

@GraphQLType()
export class User {
  @prop()
  @GraphQLField(() => ID)
  readonly id: string;

  @prop({ required: true })
  @GraphQLField()
  nickname: string;

  @prop({ required: true })
  @GraphQLField()
  email!: string;

  @prop({ required: true })
  @GraphQLField()
  password!: string;
}

export const UserModel = getModelForClass(User);
