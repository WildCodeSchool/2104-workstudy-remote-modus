/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolver, Mutation, UseMiddleware, Query, Ctx, Arg } from 'type-graphql';
import { SelfUser } from '../types/UserResponse';
import { UserModel } from '../models/User';
import { AuthenticationError } from 'apollo-server'
import { isAuth } from '../middleware/isAuth';
import { inputAddPost } from '../types/InputAddPost';
import { UpdateUserProfileInput } from '../types/updateUserData';
@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => SelfUser)
  async whoAmI(@Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    const user = await UserModel.findById({ _id: userId });

    if (!user) throw new Error('User not found');

    return { user };
  }


  @Mutation(() => UpdateUserProfileInput)
  async updateUserProfilData(@Arg('data') data: UpdateUserProfileInput, @Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    if(!userId) throw new AuthenticationError("Not logged in");
    

    //? Sur que l'email n'est pas déjà prise en bdd , si c'est pas le cas on throw erreur
    const user = await UserModel.findOneAndUpdate({ _id: userId }, data, { new: true });
    
    
    if (!user) throw new Error('User not found');
    
    console.log('data :>> ', data);


    return {  user };
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
