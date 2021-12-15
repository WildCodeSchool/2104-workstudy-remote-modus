import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';
import { Skill, SkillInput } from './Skill';

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

  @prop({ type: SkillInput })
  @GraphQLField(() => [Skill])
  skills!: SkillInput[];
}

export const PostModel = getModelForClass(Post);
