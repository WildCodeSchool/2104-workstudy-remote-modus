/* eslint-disable @typescript-eslint/no-unused-vars */
import { registerEnumType, InputType, Field } from 'type-graphql';


enum SkillList {
    NODE = 'NodeJs',
    TS = 'TypeScript',
    GQL = 'GraphQL',
    SQL = 'SQL',
}

registerEnumType(SkillList, {
  name: "SkillList", // this one is mandatory
});

@InputType()
export class SkillsInput {
    @Field(_type => SkillList)
    value: SkillList;
}
