/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resolver, Mutation, UseMiddleware, Query, Ctx, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
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

  @Mutation(() => SelfUser)
  async updateUserProfilData(@Arg('data') {email, password}: UpdateUserProfileInput, @Ctx() { userId }: { userId: string }): Promise<SelfUser> {
    
    if(!userId) throw new AuthenticationError("Not logged in");
    
    const existingUser = await UserModel.findById(userId);
    if(!existingUser) throw new Error("User not found");

    const updatedUserProfileData = {
      password: existingUser.password,
      email: existingUser.email
    };

    if(email) {
      const existingEmail = await UserModel.findOne({ email: email});
      if(existingEmail && existingEmail.email === email) throw new Error('Email already in use');
      updatedUserProfileData.email = email;
    }

    if (password){
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUserProfileData.password = hashedPassword;
    }
   
    const user = await UserModel.findOneAndUpdate({ _id: userId }, updatedUserProfileData, { new: true });

    if (!user) throw new Error('User not found');

    return {user}   
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
