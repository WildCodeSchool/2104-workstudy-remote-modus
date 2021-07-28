import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, ObjectType as GraphQLType, ID } from 'type-graphql';

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

export const PostModel = getModelForClass(Post);
