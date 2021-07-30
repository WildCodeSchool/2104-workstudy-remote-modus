import { InputType, Field } from 'type-graphql';

@InputType()
export class SkillInput {
  @Field()
  value!: string;
}

@InputType()
export class inputAddPost {
  @Field()
  title!: string;

  @Field()
  wysiwyg!: string;

  @Field(() => [SkillInput])
  skills!: SkillInput[];
}
