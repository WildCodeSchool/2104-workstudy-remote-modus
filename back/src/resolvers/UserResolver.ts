/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Arg, Mutation, UseMiddleware, Query } from 'type-graphql';
import { UserModel } from '../models/User';
import { UserInput } from '../types/UserInput';
import { isAuth } from '../middleware/isAuth';
import { SelfUser } from '../types/UserResponse';
import { UserIdInput } from '../types/UserIdInput';

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => SelfUser)
  async whoAmI(@Arg('id') id: UserIdInput): Promise<SelfUser> {
    const { _id } = id;
    console.log('_id', _id);
    const user = await UserModel.findById({ _id });

    console.log(user);

    if (!user) throw new Error('User not found');

    return { user };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateProfile(@Arg('data') data: UserInput): Promise<any> {
    console.log('data', data);
    // const { nickname, ...noNickname } = data;
    // //revoir le userResolver, aucun changement a l'email
    // if (noNickname.email) {
    //   const checkEmailAvailability = await UserModel.find({ email: noNickname.email });
    //   if (checkEmailAvailability) throw new Error('Email already in use');
    // }
    // const user = await UserModel.findOneAndUpdate({ nickname }, { noNickname }, { new: true });
    // if (!user) throw new Error("An error has occcured, couldn't update profile");
    // return { user };
  }
}
