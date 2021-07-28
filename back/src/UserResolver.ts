import { Arg, Resolver, Mutation } from 'type-graphql';
import { UserModel, User, inputUser } from './models/User';

@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg('data') data: inputUser): Promise<User> {
    const user = await UserModel.create(data);
    await user.save();

    return user;
  }
}
