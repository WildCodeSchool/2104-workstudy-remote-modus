/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolver, Arg, Mutation, UseMiddleware, Query, Ctx } from 'type-graphql';
import { UserInput } from '../types/UserInput';
import { isAuth } from '../middleware/isAuth';
import { SelfUser } from '../types/UserResponse';
import { UserModel } from '../models/User';

@Resolver()
export class UserResolver {
  // @UseMiddleware(isAuth)
  @Query(() => SelfUser)
  async whoAmI(@Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    const user = await UserModel.findById({ _id: userId });

    if (!user) throw new Error('User not found');

    return { user };
  }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async updateProfile(@Arg('data') data: UserInput): Promise<any> {
  //   console.log('data', data);
  //   // const { nickname, ...noNickname } = data;
  //   // //revoir le userResolver, aucun changement a l'email
  //   // if (noNickname.email) {
  //   //   const checkEmailAvailability = await UserModel.find({ email: noNickname.email });
  //   //   if (checkEmailAvailability) throw new Error('Email already in use');
  //   // }
  //   // const user = await UserModel.findOneAndUpdate({ nickname }, { noNickname }, { new: true });
  //   // if (!user) throw new Error("An error has occcured, couldn't update profile");
  //   // return { user };
  // }
}
