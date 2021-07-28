import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, InputType as GraphQLInputType, ID } from 'type-graphql';

@GraphQLType()
export class Skill {
  @prop()
  @GraphQLField()
  value: string;
}

@GraphQLType()
export class Post {
  @prop()
  @GraphQLField(() => ID)
  readonly id: string;

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

@GraphQLInputType()
export class SkillInput {
  @GraphQLField()
  value!: string;
}

@GraphQLInputType()
export class inputAddPost {
  @GraphQLField()
  title!: string;

  @GraphQLField()
  wysiwyg!: string;

  @GraphQLField(() => [SkillInput])
  skills!: SkillInput[];
}

export const PostModel = getModelForClass(Post);
