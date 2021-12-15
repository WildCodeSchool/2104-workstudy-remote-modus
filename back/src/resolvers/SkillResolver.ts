import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { Skill, SkillList } from '../models/Skill';


@Resolver(Skill)
export class SkillResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Skill])
  async allSkills(): Promise<Skill[]> {
    const values = Object.keys(SkillList);
    const skills: Skill[] = [];
    values.forEach(value => {
      if (value.length > 2)
      skills.push({value});
    })
    return skills;
  }
}
