import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';
import { Schema } from 'mongoose';

@GraphQLType()
export class User {
  @GraphQLField(() => ID)
  _id?: Schema.Types.ObjectId;

  @prop({ required: true })
  @GraphQLField()
  nickname: string;

  @prop({ required: true })
  @GraphQLField()
  email!: string;

  @prop({ required: true })
  password!: string;
}

export const UserModel = getModelForClass(User);
