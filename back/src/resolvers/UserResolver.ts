/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolver, Mutation, UseMiddleware, Query, Ctx, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { SelfUser } from '../types/UserResponse';
import { UserModel, User } from '../models/User';
import { AuthenticationError } from 'apollo-server';
import { isAuth } from '../middleware/isAuth';
import { UpdateUserProfileInput } from '../types/updateUserData';
import { SkillInput } from '../models/Skill';

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => SelfUser)
  async whoAmI(@Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    const user = await UserModel.findById({ _id: userId });

    if (!user) throw new Error('User not found');

    return { user };
  }

  @Mutation(() => SelfUser)
  async updateUserProfilData(
    @Arg('data') { email, password }: UpdateUserProfileInput,
    @Ctx() { userId }: { userId: string },
  ): Promise<SelfUser> {
    if (!userId) throw new AuthenticationError('Not logged in');

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) throw new Error('User not found');

    const updatedUserProfileData = {
      password: existingUser.password,
      email: existingUser.email,
    };

    if (email) {
      const existingEmail = await UserModel.findOne({ email: email });
      if (existingEmail && existingEmail.email === email) throw new Error('Email already in use');
      updatedUserProfileData.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUserProfileData.password = hashedPassword;
    }

    const user = await UserModel.findOneAndUpdate({ _id: userId }, updatedUserProfileData, { new: true });

    if (!user) throw new Error('User not found');

    return { user };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateSkills(
    @Ctx() { userId }: { userId: string },
    @Arg('skills', (_type) => [SkillInput]) skills: SkillInput[],
  ): Promise<User> {
    let user = await UserModel.findById({ _id: userId });
    if (!user) throw new Error('User not found');

    user = user.toObject();

    const skillsArr = skills;
    const skillsMaped = skillsArr.map((skill) => ({ value: skill.value }));
    const userCopy = { ...user, skills: skillsMaped };
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, userCopy, { new: true });

    if (!updatedUser) throw new Error('Could not update user');
    return updatedUser;
  }
}
