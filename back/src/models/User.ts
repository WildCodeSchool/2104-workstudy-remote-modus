/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';
import { Schema } from 'mongoose';
import { Skill } from './Skill';

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

  @prop({type: () => [Skill]})
  @GraphQLField(_type => [Skill])
  skills: Skill[];
}

export const UserModel = getModelForClass(User);
