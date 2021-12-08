import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Skill, SkillList } from '../models/Skill';


@Resolver(Skill)
export class SkillResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Skill])
  async allSkills(): Promise<Skill[]> {
    const values = Object.values(SkillList)
    const skills: { value: SkillList; }[] = [];
    values.forEach((value) => skills.push({value}));

    return skills;
  }
}
