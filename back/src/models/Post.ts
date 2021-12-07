import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';
import { Skill } from './Skill';

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
}

export const PostModel = getModelForClass(Post);
