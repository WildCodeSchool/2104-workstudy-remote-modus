/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Ctx, UseMiddleware, Mutation, Arg } from 'type-graphql';
import { SelfUser } from '../types/UserResponse';
import { UserModel } from '../models/User';
import { isAuth } from '../middleware/isAuth';
import { SkillsInput } from '../types/SkillsInput';

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => SelfUser)
  async whoAmI(@Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    const user = await UserModel.findById({ _id: userId });

    if (!user) throw new Error('User not found');

    return { user };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => SelfUser)
  async UpdateSkills(@Ctx() {userId}: {userId: string}, @Arg("skills", _type => [SkillsInput]) skills: [SkillsInput] ): Promise<SelfUser> {
    let user = await UserModel.findById({ _id: userId });
    user = user?.toObject()
    const skillsArr = skills;
    const skillsMaped = skillsArr.map(skill => skill.value)
    const userCopy = {...user, skills: skillsMaped};
    console.log(userCopy);

    if (!user) throw new Error('User not found');

    return {user}
  }
}
