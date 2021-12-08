import { prop } from '@typegoose/typegoose';
import { Field, Field as GraphQLField, InputType, ObjectType as GraphQLType, registerEnumType } from 'type-graphql';

export enum SkillList {
    NODE = 'NodeJs',
    TS = 'TypeScript',
    GQL = 'GraphQL',
    SQL = 'SQL',
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
    @Field(_type => SkillList)
    value: SkillList;
}
