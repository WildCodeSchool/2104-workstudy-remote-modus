/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field as GraphQLField, InputType, ObjectType as GraphQLType, registerEnumType } from 'type-graphql';

export enum SkillList {
  ANG = 'Angular',
  CCC = 'C++',
  CSH = 'C#',
  GQL = 'GraphQL',
  GO = 'Go',
  NODE = 'NodeJS',
  PHP = 'PHP',
  REACT = 'React',
  REACTN = 'React Native',
  SQL = 'SQL',
  TS = 'TypeScript',
  VUE = 'VueJS',
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
