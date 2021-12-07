import { InputType, Field } from 'type-graphql';

@InputType()
export class SkillInput {
  @Field()
  value!: string;
}

@InputType()
export class UpdateUserProfileInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@InputType()
export class UpdateUserSkillsInput {
    @Field(() => [SkillInput])
    skills!: SkillInput[];

}