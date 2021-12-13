/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, InputType, ObjectType as GraphQLType, registerEnumType } from 'type-graphql';

export enum SkillList {
  'Angular',
  'C++',
  'C#',
  'GraphQL',
  'Go',
  'NodeJS',
  'PHP',
  'React',
  'React Native',
  'SQL',
  'TypeScript',
  'VueJS',
}

registerEnumType(SkillList, {
  name: "SkillList", // this one is mandatory
});
@GraphQLType()
export class Skill {
  @prop()
  @GraphQLField()
  value: string;
}
@InputType()
export class SkillInput {
  @GraphQLField(_type => SkillList)
  value: SkillList;
}


export const SkillModel = getModelForClass(Skill);
