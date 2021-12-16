import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { AuthRegisterInput, AuthLoginInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { email, password, nickname }: AuthRegisterInput,
  ): Promise<UserResponse> {
    // check for existing user attached to this email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) throw new Error('Email déjà pris');

    const existingNickname = await UserModel.findOne({ nickname });

    if (existingNickname) throw new Error('Pseudonyme déjà pris');

    // register user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, nickname, password: hashedPassword });
    await user.save();

    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'testuntilweputdotenv');

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(@Arg('input') { email, password }: AuthLoginInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Mot de passe ou email invalide');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Mot de passe ou email invalide');
    }

    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'testuntilweputdotenv');

    return { user, token };
  }
}
