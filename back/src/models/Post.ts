import { getModelForClass, prop, mongoose } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';
import { Skill } from './Skill';
import { User } from './User';

@GraphQLType()
export class Post {
  @GraphQLField(() => ID)
  _id?: string;

  @prop({ required: true })
  @GraphQLField()
  title!: string;

  @prop({ required: true })
  @GraphQLField()
  wysiwyg!: string;

  @prop({ type: Skill })
  @GraphQLField(() => [Skill])
  skills!: Skill[];

  @prop()
  @GraphQLField(() => String)
  creatorId?: mongoose.Types.ObjectId;

  @GraphQLField(() => [User])
  creator?: [User];
}

export const PostModel = getModelForClass(Post);