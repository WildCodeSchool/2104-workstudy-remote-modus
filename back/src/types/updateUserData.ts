import { InputType, Field } from 'type-graphql';

@InputType()
export class SkillInput {
  @Field()
  value!: string;
}

@InputType()
export class UpdateUserProfileInput {
  @Field()
  email?: string;

  @Field()
  password?: string;
}

@InputType()
export class UpdateUserSkillsInput {
    @Field(() => [SkillInput])
    skills!: SkillInput[];

}