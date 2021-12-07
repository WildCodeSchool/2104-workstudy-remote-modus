/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Ctx, UseMiddleware, Mutation, Arg } from 'type-graphql';
import { User, UserModel } from '../models/User';
import { isAuth } from '../middleware/isAuth';
import { SkillInput } from '../models/Skill';

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async whoAmI(@Ctx() { userId }: { userId: string }): Promise<User> {
    const user = await UserModel.findById({ _id: userId });

    if (!user) throw new Error('User not found');

    return user;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateSkills(@Ctx() {userId}: {userId: string}, @Arg("skills", _type => [SkillInput]) skills: SkillInput[] ): Promise<User> {
    let user = await UserModel.findById({ _id: userId });
    if (!user) throw new Error('User not found');

    user = user.toObject()

    const skillsArr = skills;
    const skillsMaped = skillsArr.map(skill => ({ value:skill.value }))
    const userCopy = {...user, skills: skillsMaped};
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, userCopy, { new: true });

    if (!updatedUser) throw new Error('Could not update user');
    return updatedUser;
  }
}
